import {version as appVersion} from '../../package.json';
import {writeFile} from 'node:fs';
import chalk from 'chalk';
import axios from 'axios';
import {readFile} from 'node:fs/promises';
import IOffer, {TypeCity, TypeComfortable, TypeLocation, TypeOffer} from '../app/models/IOffer.ts';
import {interfaces} from 'inversify';
import {Component} from '../app/settings/component.ts';
import IDB from '../app/DB/IDB.ts';
import IOfferService from '../app/services/interfaces/IOfferService.ts';
import {baseContainer} from '../app/container/baseContainer.ts';

export default class CommandCLI {
  private logicApp: interfaces.Container;

  constructor() {
    (async () => {
      this.logicApp = await baseContainer();
    })();
  }

  private readonly defaultText: string = [
    '--version:                   # выводит номер версии',
    '--help:                      # печатает этот текст',
    '--import <path>:             # импортирует данные из TSV',
    '--generate <n> <path> <url>  # генерирует произвольное количество тестовых данных',
  ].join('\n');

  public readonly commands = {
    '--version': () => this.version(),
    '--help': () => this.help(),
    '--import': (...params: string[]) => {
      const [filePath, connectionDB] = params;
      console.log(this.logicApp);
      this.importFile(filePath, connectionDB, this.logicApp.get<IDB>(Component.DB), this.logicApp.get<IOfferService>(Component.OfferService));
    },
    '--generate': (...params: string[]) => {
      const [countParams, pathSaveFile, pathUrl] = params;
      this.generate(+countParams, pathSaveFile, pathUrl);
    },
  };

  public help(): void {
    console.log(chalk.bold(this.defaultText));
  }

  public version(): void {
    console.log(chalk.green(`Version app: ${appVersion}`));
  }

  public async importFile(filePath: string, connectionDB: string, db: IDB, offerService: IOfferService): Promise<IOffer[] | void> {
    let strData = '';
    try {
      const data = await readFile(filePath);
      strData = data.toString('utf-8');
    } catch (e) {
      throw new Error(chalk.red.bold('File error!'));
    }
    const offers: IOffer[] = [];
    await db.connect(connectionDB);
    for (const row of strData.split('\n')) {
      if (row.trim().length === 0) {
        continue;
      }
      const [name,
        description,
        city,
        prevPicture,
        images,
        premium,
        favorite,
        rating,
        type,
        countRooms,
        countGuests,
        price,
        comfortable,
        countComments,
        location] = row.split('\t');
      const offer: IOffer = {
        name,
        description,
        city: city as TypeCity,
        prevPicture,
        images: images.split(', '),
        rating: +rating,
        premium: JSON.parse(premium),
        favorite: JSON.parse(favorite),
        type: type as TypeOffer,
        countComments: +countComments,
        location: location as TypeLocation,
        countRooms: +countRooms,
        countGuests: +countGuests,
        price: +price,
        comfortable: comfortable.split(', ') as TypeComfortable[]
      };
      offers.push(offer);
      await offerService.create(offer);
    }
    console.log(JSON.stringify(offers, null, 4));
    await db.disconnect();
    return offers;
  }

  public async generate(countOffers: number, pathSaveFile: string, pathUrl: string): Promise<void> {
    const {data: offers} = await axios.get<IOffer[]>(`${pathUrl}?_limit=${countOffers}`);
    if (countOffers > offers.length) {
      console.log(chalk.yellow.bold(`Max count offers ${offers.length}`));
    }
    const fileContent: string[] = [];
    for (const offer of offers) {
      for (const key of Object.keys(offer)) {
        fileContent.push(`${offer[key]}\t`);
      }
      fileContent.push('\n');
    }
    fileContent.pop();
    const fileName = `${pathSaveFile}/mocks.tsv`;
    writeFile(fileName, fileContent.join(''), (err) => {
      if (err) {
        throw new Error(chalk.red.bold(`File ${fileName} write error!`));
      }
    });
  }
}
