import {getRandomIntInRange} from '../utils.js';
import { DESCRIPTION } from './const.js';
import { CITIES } from './const.js';

const generateDescription = () => {
  const randomIndex = getRandomIntInRange(0, DESCRIPTION.length - 1);
  return DESCRIPTION[randomIndex];
};

const generateName = () => {
  const randomIndex = getRandomIntInRange(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generatePicture = () => {
  const randomIndex = getRandomIntInRange(1, 100);
  const srcPicture = `http://picsum.photos/248/152${randomIndex}`;
  const descriptionPicture = `Random picture number 152${randomIndex}`;
  return {
    scr: srcPicture,
    description: descriptionPicture
  };
};

export const getDestination = () => ({
  id: getRandomIntInRange(1, 100),
  name: generateName(),
  description: generateDescription(),
  basePrice: getRandomIntInRange(1100, 1900),
  pictures: generatePicture()
});
