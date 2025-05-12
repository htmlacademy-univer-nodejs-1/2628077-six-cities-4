import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from './UserEntity.ts';
import {OfferEntity} from './OfferEntity.ts';


export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({type: () => String, required: true, trim: true})
  public text: string;

  @prop({type: () => Number, required: true, default: 5})
  public rating: number;

  @prop({type: () => Number, required: true, default: 0})
  public countMarks: number;

  @prop({ref: () => UserEntity, required: true})
  public authorID: Ref<UserEntity>;

  @prop({ref: () => OfferEntity, required: true})
  public offerID: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
