import {env} from '../settings/globalVariables.ts';
import {inject, injectable} from 'inversify';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import IDB from '../DB/IDB.ts';
import {IExceptionFilter} from '../middleware/exeptionFilter/IExeptionFilter.ts';
import {IBaseController} from '../controllers/baseController/IBaseController.ts';
import express, {Express} from 'express';

@injectable()
export default class Application {
  private readonly _server: Express;

  constructor(@inject(Component.Logger) private readonly logger: AppLogger,
              @inject(Component.DB) private readonly db: IDB,
              @inject(Component.ExceptionFilter) private readonly appExceptionFilter: IExceptionFilter,
              @inject(Component.OfferController) private readonly offerControllers: IBaseController,
              @inject(Component.UserController) private readonly userController: IBaseController,
              @inject(Component.CommentController) private readonly commentController: IBaseController) {
    this._server = express();
  }

  private get server() {
    return this._server;
  }

  private async _initServer(): Promise<void> {
    await this.server.listen(env.PORT);
    this.logger.logger.info(`Listen PORT: ${env.PORT}!`);
  }

  private async _initControllers(): Promise<void> {
    await (async () => {
      this.server.use('/categories', this.offerControllers.router);
      this.server.use('/users', this.userController.router);
      this.server.use('/comment', this.commentController.router);
    })();

    this.logger.logger.info('Controllers init!');
  }

  private async _initMiddleware(): Promise<void> {
    await (async () => {
      this.server.use(express.json());
      this.server.use(
        '/upload',
        express.static(env.UPLOAD_DIRECTORY)
      );
    })();
    this.logger.logger.info('Middleware init!');
  }

  private async _initExceptionFilters(): Promise<void> {
    await this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.logger.logger.info('App Exceptions init!');
  }

  private async _initDB(): Promise<void> {
    this.db.connect();
  }

  public async init(): Promise<void> {
    this.logger.logger.info(`App init! PORT: ${env.PORT}!`);
    await this._initDB();
    await this._initMiddleware();
    await this._initControllers();
    await this._initExceptionFilters();
    await this._initServer();
  }
}
