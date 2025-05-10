import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, City, RentalType, RentalAmenities, UserType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const CITIES_INFO = [
  {
    city: City.paris,
    coordinates: [48.85661, 2.351499]
  },
  {
    city: City.cologne,
    coordinates: [50.938361, 6.959974]
  },
  {
    city: City.brussels,
    coordinates: [50.846557, 4.351697]
  },
  {
    city: City.amsterdam,
    coordinates: [52.370216, 4.895168]
  },
  {
    city: City.hamburg,
    coordinates: [53.550341, 10.000654]
  },
  {
    city: City.dusseldorf,
    coordinates: [51.225402, 6.776314]
  }
];

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItems<string>(this.mockData.title);
    const info = getRandomItems<string>(this.mockData.info);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const [city, coordinates] = getRandomItems(CITIES_INFO);
    const preview = getRandomItems<string>(this.mockData.preview);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const premium = getRandomItem<string>(['true', 'false']);
    const favorite = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomItem([
      RentalType.apartment,
      RentalType.hotel,
      RentalType.house,
      RentalType.room
    ]);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems([
      RentalAmenities.airConditioning,
      RentalAmenities.fridge,
      RentalAmenities.towels,
      RentalAmenities.babySeat,
      RentalAmenities.washer,
      RentalAmenities.breakfast,
      RentalAmenities.laptopFriendlyWorkspace
    ]).join(';');
    const name = getRandomItems<string>(this.mockData.name);
    const email = getRandomItems<string>(this.mockData.email);
    const avatar = getRandomItems<string>(this.mockData.avatar);
    const password = getRandomItems<string>(this.mockData.password);
    const userType = getRandomItem([
      UserType.normal,
      UserType.pro
    ]);

    return [
      title, info, date,
      city, preview, photos,
      premium, favorite, rating,
      type, rooms, guests, price,
      amenities, name, email, avatar,
      password, userType, coordinates
    ].join('\t');
  }
}
