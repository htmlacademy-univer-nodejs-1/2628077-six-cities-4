import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BaseController} from '../baseController/BaseController.ts';
import {Component} from '../../settings/component.ts';
import AppLogger from '../../logger/Logge.tsr';
import {HttpMethod} from '../httpLogic/httpMethod.ts';
import {fillDTO} from '../../../helpers/fillDTO.ts';
import {OfferRdo} from '../rdo/OfferRdo.ts';
import {OfferService} from '../../services/OfferService.ts';
import {HttpError} from '../httpLogic/httpError.ts';
import {CreateOfferRequest} from './CreateOfferRequest.ts';
import {DeleteOfferRequest} from './DeleteOfferRequest.ts';
import {ChangeOfferRequest} from './ChangeOfferRequest.ts';
import {ValidateObjectIdMiddleware} from '../../middleware/ValidateObjectIdMiddleware.ts';
import {ParamOfferId} from './ParamOfferId.ts';
import {ValidateDtoMiddleware} from '../../middleware/ValidateDtoMiddleware.ts';
import {CreateOfferDTO} from '../../dto/offer/CreateOfferDTO.ts';
import {DocumentExistsMiddleware} from '../../middleware/DocumentExistsMiddleware.ts';
import {UpdateOfferDTO} from '../../dto/offer/UpdateOfferDTO.ts';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: AppLogger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDTO)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.changeOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.findByID(body.offerID);

    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with ID «${body.offerID}» exists.`,
        'OfferController'
      );
    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async delete({body: {id}}: DeleteOfferRequest, res: Response): Promise<void> {
    const existOffer = await this.offerService.findByID(id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer with ID «${id}» doesn\`t exists.`,
        'OfferController'
      );
    }
    const deletedOffer = await this.offerService.deleteByID(id);
    this.ok(res, fillDTO(OfferRdo, deletedOffer));
  }

  public async changeOffer({body}: ChangeOfferRequest, res: Response): Promise<void> {
    const {id, ...newOffer} = body;
    const existOffer = await this.offerService.findByID(id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer with ID «${id}» doesn\`t exists.`,
        'OfferController'
      );
    }
    const newOfferDb = await this.offerService.changeOffer(body.id, newOffer);
    this.ok(res, fillDTO(OfferRdo, newOfferDb));
  }
}
