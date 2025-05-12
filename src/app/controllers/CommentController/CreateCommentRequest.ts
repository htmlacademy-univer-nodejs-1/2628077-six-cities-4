import {Request} from 'express';
import {RequestBody, RequestParams} from '../httpLogic/httpEntities.ts';
import {CreateCommentDTO} from '../../dto/comment/CreateCommentDTO.ts';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDTO>;
