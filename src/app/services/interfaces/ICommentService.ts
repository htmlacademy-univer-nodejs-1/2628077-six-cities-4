import IComment from '../../models/IComment.ts';
import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from '../../DB/mongo/entities/CommentEntity.ts';

interface ICommentService {
  create(comment: IComment): Promise<DocumentType<CommentEntity>>;
  findByID(id: string): Promise<DocumentType<CommentEntity> | null>;
  deleteCommentByID(id: string): Promise<DocumentType<CommentEntity>>;
  changeRating(id: string, rate: number): Promise<void>
}

export default ICommentService;
