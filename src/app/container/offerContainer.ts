import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {OfferEntity, OfferModel} from '../DB/mongo/entities/OfferEntity.ts';
import {Component} from '../settings/component.ts';
import IOfferService from '../services/interfaces/IOfferService.ts';
import {OfferService} from '../services/OfferService.ts';
import {IBaseController} from '../controllers/baseController/IBaseController.ts';
import {OfferController} from '../controllers/OfferController/OfferController.ts';

export const offerContainer = () => {
  const container = new Container();

  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<types.ModelType<IOfferService>>(Component.OfferService).to(OfferService).inSingletonScope();
  container.bind<IBaseController>(Component.OfferController).to(OfferController).inSingletonScope();

  return container;
};
