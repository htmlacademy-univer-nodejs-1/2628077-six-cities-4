import {Container} from 'inversify';
import {Component} from '../settings/component.ts';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from '../DB/mongo/entities/CommentEntity.ts';
import {CommentService} from '../services/CommentService.ts';
import ICommentService from '../services/interfaces/ICommentService.ts';
import {IBaseController} from '../controllers/baseController/IBaseController.ts';

export const commentContainer = () => {
  const container = new Container();

  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  container.bind<types.ModelType<ICommentService>>(Component.CommentService).to(CommentService).inSingletonScope();
  container.bind<types.ModelType<IBaseController>>(Component.CommentController).to(CommentService).inSingletonScope();

  return container;
};
