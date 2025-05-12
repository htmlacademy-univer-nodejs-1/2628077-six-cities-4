import {Request} from 'express';
import {UpdateOfferDTO} from '../../dto/offer/UpdateOfferDTO.ts';


export type ChangeOfferRequest = Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDTO>;
