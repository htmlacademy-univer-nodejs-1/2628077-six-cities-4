import pino, {Logger} from 'pino';
import {pinoConfig} from './pinoConfig.ts';
import {injectable} from 'inversify';

@injectable()
export default class AppLogger {

  public readonly logger: Logger;
  constructor() {
    this.logger = pino(pinoConfig);
  }
}
