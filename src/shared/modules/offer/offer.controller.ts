import {BaseController, HttpError, HttpMethod} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {OfferService} from './offer-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {StatusCodes} from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.addFavorite });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.removeFavorite });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const responseData = fillDTO(OfferRdo, result);
    this.created(res, responseData);
  }

  public async show({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params }: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params['offerId'] as string, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const favorites = await this.offerService.findFavorite();
    this.ok(res, fillDTO(OfferRdo, favorites));
  }

  public async getPremium(req: Request, res: Response): Promise<void> {
    const city = req.query.city;
    if (city) {
      const offers = await this.offerService.findPremiumByCity(city as string);
      this.ok(res, fillDTO(OfferRdo, offers));
    } else {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request',
        'OfferController'
      );
    }
  }

  public async addFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (offer) {
      const result = await this.offerService.addFavorite(id);
      this.ok(res, fillDTO(OfferRdo, result));
    } else {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (offer) {
      const result = await this.offerService.removeFavorite(id);
      this.ok(res, fillDTO(OfferRdo, result));
    } else {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }
  }
}
