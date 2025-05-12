export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  info: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalid: 'city must be value from City Enum',
  },
  photos: {
    invalidFormat: 'Images must be an array',
  },
  premium: {
    invalidFormat: 'Must be Boolean',
  },
  favorite: {
    invalidFormat: 'Must be Boolean',
  },
  rating: {
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 5',
    invalidFormat: 'Must be Number',
  },
  type: {
    invalid: 'type must be value from OfferType Enum',
  },
  rooms: {
    minValue: 'Minimum roomCount is 1',
    maxValue: 'Maximum roomCount is 8',
    invalidFormat: 'Must be Number',
  },
  guests: {
    minValue: 'Minimum guestCount is 1',
    maxValue: 'Maximum guestCount is 10',
    invalidFormat: 'Must be Number',
  },
  price: {
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
    invalidFormat: 'Price must be an Number',
  },
  amenities: {
    invalidFormat: 'Must be an array',
    invalidAmenityFormat: 'amenity must be value from Amenity Enum'
  },
  coordinates: {
    invalidFormat: 'Must be two numbers an array',
  }
} as const;
