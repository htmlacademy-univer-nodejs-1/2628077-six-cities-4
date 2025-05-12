import IOffer from '../../models/IOffer.ts';
import {OfferEntity} from '../../DB/mongo/entities/OfferEntity.ts';
import {DocumentType} from '@typegoose/typegoose';

interface IOfferService {
  create(offer: IOffer): Promise<DocumentType<OfferEntity>>;
  findByID(id: string): Promise<DocumentType<OfferEntity | null>>;
  changeRating(id: string, rate: number): Promise<void>;
  deleteByID(id: string): Promise<DocumentType<OfferEntity>>;
  find(): Promise<DocumentType<OfferEntity>[]>;
}

export default IOfferService;
