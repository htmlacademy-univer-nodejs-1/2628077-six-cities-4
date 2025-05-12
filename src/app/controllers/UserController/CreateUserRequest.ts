import { Request } from 'express';
import {RequestBody, RequestParams} from '../httpLogic/httpEntities.ts';
import {CreateUserDTO} from '../../dto/user/CreateUserDTO.ts';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDTO>;
