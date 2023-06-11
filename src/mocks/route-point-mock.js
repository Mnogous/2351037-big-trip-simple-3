import {getRandomIntInRange} from '../utils.js';
import { DATES } from './const.js';
import { CITIES } from './const.js';
import { OFFERS } from './const.js';
import { TYPES } from './const.js';

const generateDate = () => {
  const randomIndex = getRandomIntInRange(0, DATES.length - 1);
  return DATES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomIntInRange(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generateOffers = () => {
  const randomIndex = getRandomIntInRange(0, OFFERS.length - 2);
  return [OFFERS[randomIndex],OFFERS[randomIndex + 1]];
};

const generateType = () => {
  const randomIndex = getRandomIntInRange(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

export const getRoutePoint = () => {
  const dates = generateDate();
  return ({
    basePrice: getRandomIntInRange(1100, 1900),
    dateFrom: dates.dateFrom,
    dateTo: dates.dateTo,
    destination: generateDestination(),
    id: getRandomIntInRange(1, 100),
    offers: generateOffers(),
    type: generateType()
  });
};
