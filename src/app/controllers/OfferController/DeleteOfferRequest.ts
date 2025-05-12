import {Request} from 'express';

export type DeleteOfferRequest = Request<Record<string, unknown>, Record<string, unknown>, {id: string}>;
