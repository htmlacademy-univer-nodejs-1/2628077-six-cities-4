import {DocumentType, Ref, types} from '@typegoose/typegoose';
import {CommentEntity} from '../DB/mongo/entities/CommentEntity.ts';
import ICommentService from './interfaces/ICommentService.ts';
import {inject, injectable} from 'inversify';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import {OfferEntity} from '../DB/mongo/entities/OfferEntity.ts';
import {CreateCommentDTO} from '../dto/comment/CreateCommentDTO.ts';


@injectable()
export class CommentService implements ICommentService {

  constructor(@inject(Component.Logger) private readonly logger: AppLogger,
              @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
              @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>) {
  }

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    const offer: DocumentType<OfferEntity> | null = await this.offerModel.findById(comment.offerID);

    if (offer === null) {
      throw new Error('reCannot find offer');
    }

    offer.commentsOffers.push(comment.id);
    offer.countComments++;
    await offer.save();
    this.logger.logger.info(`New comment create: ${comment.id}. OfferID: ${offer.id}`);

    return comment;
  }

  public async findByID(id: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findById(id);
  }

  public async deleteCommentByID(id: string): Promise<DocumentType<CommentEntity>> {
    const comment: DocumentType<CommentEntity | null> = await this.commentModel.findById(id);
    if (comment === null) {
      throw new Error('Cannot find comment');
    }

    const offer: DocumentType<OfferEntity> | null = await this.offerModel.findById(comment);

    if (offer === null) {
      throw new Error('Cannot find offer');
    }

    offer.countComments--;
    offer.commentsOffers = offer.commentsOffers.filter((comm: Ref<CommentEntity>) => comm.id !== comment.id);
    await offer.save();

    this.logger.logger.info(`Delete comment: ${comment.id}.`);
    return comment;
  }

  public async changeRating(id: string, rate: number): Promise<void> {
    const comment: DocumentType<CommentEntity> | null = this.commentModel.findById(id);
    if (comment === null) {
      throw new Error('Cannot find comment');
    }

    comment.rating = comment.countMarks === 0
      ? rate
      : +((comment.rating + rate) / (comment.countMarks + 1)).toFixed(2);

    comment.countMarks++;
    this.logger.logger.info(`New comment rating ${comment.rating}, id: ${comment.id}.`);
    return comment.save();
  }
}
