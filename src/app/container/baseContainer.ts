import {Container} from 'inversify';
import {containerUser} from './userContainer.ts';
import {containerInit} from './initContainer.ts';
import {offerContainer} from './offerContainer.ts';
import {commentContainer} from './commentContainer.ts';


export const baseContainer = () => Container.merge(containerInit(), containerUser(), offerContainer(), commentContainer());

