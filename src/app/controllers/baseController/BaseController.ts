import {injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {Response, Router} from 'express';
import asyncHandler from 'express-async-handler';
import {IBaseController} from './IBaseController.ts';
import AppLogger from '../../logger/Logger.ts';
import {Route} from './route.ts';
import {IMiddleware} from '../../middleware/IMiddleware.ts';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export class BaseController implements IBaseController {
  private readonly _router: Router;

  constructor(
    protected readonly logger: AppLogger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route): void {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item: IMiddleware) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.router[route.method](route.path, allHandlers);
    this.logger.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
