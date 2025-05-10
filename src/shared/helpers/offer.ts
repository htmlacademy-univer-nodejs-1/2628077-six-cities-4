import { RentalOffer, RentalType, UserType, RentalAmenities, City } from '../types/index.js';

export function createOffer(offerData: string): RentalOffer {
  const [
    title,
    info,
    date,
    city,
    preview,
    photos,
    premium,
    favorite,
    rating,
    type,
    rooms,
    guests,
    price,
    amenities,
    name,
    email,
    avatar,
    password,
    userType,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    info,
    date: new Date(date),
    city: city as City,
    preview,
    photos: photos.split(';'),
    premium: premium.toLowerCase() === 'true',
    favorite: favorite.toLowerCase() === 'true',
    rating: Number.parseInt(rating, 10),
    type: type as RentalType,
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    amenities: amenities
      .split(';')
      .map((amenity) => amenity as RentalAmenities),
    renter: {
      name,
      email,
      avatar,
      password,
      type: userType as UserType
    },
    countComments: 0,
    coordinates: coordinates.split(';').map((coordinate) => Number.parseFloat(coordinate)),
  };
}
