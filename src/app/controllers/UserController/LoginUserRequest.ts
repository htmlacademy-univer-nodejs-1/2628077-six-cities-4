import {Request} from 'express';
import {RequestBody, RequestParams} from '../httpLogic/httpEntities.ts';
import {LoginUserDTO} from '../../dto/user/LoginUserDTO.ts';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDTO>;
