import 'reflect-metadata';
import {baseContainer} from './app/container/baseContainer.ts';
import Application from './app/init/Application.ts';
import {Component} from './app/settings/component.ts';

const container = await baseContainer();
const app = container.get<Application>(Component.App);
app.init();
