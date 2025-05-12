import {NextFunction, Request, Response} from 'express';
import {HttpMethod} from '../httpLogic/httpMethod.ts';
import {IMiddleware} from '../../middleware/IMiddleware.ts';

export interface Route {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[]
}
