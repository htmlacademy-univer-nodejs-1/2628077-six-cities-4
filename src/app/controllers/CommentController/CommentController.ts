import {inject, injectable} from 'inversify';
import {Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BaseController} from '../baseController/BaseController.ts';
import {Component} from '../../settings/component.ts';
import AppLogger from '../../logger/Logge.tsr';
import {HttpMethod} from '../httpLogic/httpMethod.ts';
import {fillDTO} from '../../../helpers/fillDTO.ts';
import {OfferService} from '../../services/OfferService.ts';
import {HttpError} from '../httpLogic/httpError.ts';
import {CommentService} from '../../services/CommentService.ts';
import {CreateCommentRequest} from './CreateCommentRequest.ts';
import {CommentRdo} from '../rdo/CommentRdo.ts';
import {CreateCommentDTO} from '../../dto/comment/CreateCommentDTO.ts';
import {ValidateDtoMiddleware} from '../../middleware/ValidateDtoMiddleware.ts';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: AppLogger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDTO)
      ]
    });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (!await this.offerService.findByID(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
