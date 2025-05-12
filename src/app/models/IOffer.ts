
export type TypeOffer = 'apartment' | 'house' | 'room' | 'hotel';

export type TypeCity = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';


export type TypeLocation = 'Paris (latitude: 48.85661, longitude: 2.351499)' |
  'Cologne (latitude: 50.938361, longitude: 6.959974)' |
  'Brussels (latitude: 50.846557, longitude: 4.351697)' |
  'Amsterdam (latitude: 52.370216, longitude: 4.895168)' |
  'Hamburg (latitude: 53.550341, longitude: 10.000654)' |
  'Dusseldorf (latitude: 51.225402, longitude: 6.776314)';

export type TypeComfortable = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

interface IOffer {
  name: string;
  description: string;
  city: TypeCity,
  prevPicture: string,
  images: string[],
  premium: boolean,
  favorite: boolean,
  rating: number,
  type: TypeOffer,
  countRooms: number,
  countGuests: number,
  price: number,
  comfortable: TypeComfortable[],
  countComments: number,
  location: TypeLocation,
}

export default IOffer;
