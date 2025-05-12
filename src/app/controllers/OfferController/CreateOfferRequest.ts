import {Request} from 'express';
import {CreateOfferDTO} from '../../dto/offer/CreateOfferDTO.ts';

export type CreateOfferRequest = Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>;
