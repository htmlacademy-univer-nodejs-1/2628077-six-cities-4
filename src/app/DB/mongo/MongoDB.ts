import {inject, injectable} from 'inversify';
import {connect, disconnect} from 'mongoose';
import {env} from '../../settings/globalVariables.ts';
import {Component} from '../../settings/component.ts';
import AppLogger from '../../logger/Logger.ts';
import IDB from '../IDB.ts';


@injectable()
export default class MongoDB implements IDB {
  private _isConnected: boolean;
  public constructor(@inject(Component.Logger) private readonly logger: AppLogger) {
    this._isConnected = false;
  }

  public async connect(url?: string): Promise<void> {
    try {
      if (this._isConnected) {
        return this.logger.logger.warn('You are connected!');
      }
      this.logger.logger.info(`Try to connect DB. URL: ${env.DB_URL}`);
      await connect(url || env.DB_URL);
      this._isConnected = true;
      this.logger.logger.info('Connect DB');
    } catch (e: unknown) {
      if (e instanceof Error) {
        this.logger.logger.error(`Fail connect to DB! ${e.message}`);
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (!this._isConnected) {
      return this.logger.logger.warn('You are disconnect!');
    }
    try {
      await disconnect();
      this._isConnected = true;
      this.logger.logger.info('Disconnect DB');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.logger.error(`Fail disconnect to DB! ${e.message}`);
      }
    }
  }
}
