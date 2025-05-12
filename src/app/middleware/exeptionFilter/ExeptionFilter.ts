import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import AppLogger from '../../logger/Logger.ts';
import {IExceptionFilter} from './IExeptionFilter.ts';
import {Component} from '../../settings/component.ts';
import {createErrorObj} from '../../../helpers/createErrorObj.ts';
import {HttpError} from '../../controllers/httpLogic/httpError.ts';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: AppLogger
  ) {
    this.logger.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error | HttpError, _req: Request, res: Response, _next: NextFunction): void {
    if (error instanceof HttpError) {
      this.logger.logger.error(`HTTP Error: [${error.detail}]: ${error.httpStatusCode} — ${error.message}`, error);
      res
        .status(error.httpStatusCode)
        .json(createErrorObj(error.message));
      return;
    }

    this.logger.logger.error(`Other Error: ${error.message}, ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObj(error.message));
  }
}
