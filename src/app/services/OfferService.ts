import {DocumentType, Ref, types} from '@typegoose/typegoose';
import {OfferEntity} from '../DB/mongo/entities/OfferEntity.ts';
import IOfferService from './interfaces/IOfferService.ts';
import {inject, injectable} from 'inversify';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import {UserEntity} from '../DB/mongo/entities/UserEntity.ts';
import {CommentEntity} from '../DB/mongo/entities/CommentEntity.ts';
import {CreateOfferDTO} from '../dto/offer/CreateOfferDTO.ts';
import {UpdateOfferDTO} from '../dto/offer/UpdateOfferDTO.ts';

@injectable()
export class OfferService implements IOfferService {

  constructor(@inject(Component.Logger) private readonly logger: AppLogger,
              @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
              @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
              @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>) {
  }

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const offer: DocumentType<OfferEntity> = await this.offerModel.create(dto);
    const author: DocumentType<UserEntity> | null = await this.userModel.findById(offer.authorID);

    if (author === null) {
      throw new Error('Cannot add offer to user!');
    }

    author.comments.push(offer.id);
    await author.save();

    this.logger.logger.info(`New offer created: ${offer.name}`);
    return offer;
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find();
  }

  public async changeOffer(id: string, dto: UpdateOfferDTO) {
    return this.offerModel.updateOne({ _id: id}, dto);
  }

  public async findByID(id: string): Promise<DocumentType<OfferEntity | null>> {
    return this.offerModel.findById(id).populate(['users', 'comments']).exec();
  }

  public async changeRating(id: string, rate: number): Promise<void> {
    const offer: DocumentType<OfferEntity> | null = await this.offerModel.findById(id);
    if (offer === null) {
      throw new Error('Cannot find offer!');
    }

    offer.rating = offer.countMarks === 0
      ? rate
      : offer.rating = +((offer.rating + rate) / (offer.countMarks + 1)).toFixed(2);

    offer.countMarks++;
    this.logger.logger.info(`New offer rating ${offer.rating}, id: ${offer.id}.`);
    return offer.save();
  }

  public async deleteByID(id: string): Promise<DocumentType<OfferEntity>> {
    const offer: DocumentType<OfferEntity> | null = this.offerModel.findById(id);
    if (offer === null) {
      throw new Error('Cannot find offer!');
    }

    for (const comm of offer.commentsOffers) {
      await this.commentModel.findByIdAndDelete(comm.id);
    }

    const user: DocumentType<OfferEntity> | null = await this.userModel.findById(offer.authorID);
    user?.commentsOffers.filter((userOffer: Ref<CommentEntity>) => userOffer.id !== offer.id);

    this.logger.logger.info(`Delete offer: ${offer.id}.`);
    return offer;
  }
}
