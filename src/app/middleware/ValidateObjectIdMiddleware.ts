import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import {IMiddleware} from './IMiddleware.ts';
import {HttpError} from '../controllers/httpLogic/httpError.ts';

export class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
