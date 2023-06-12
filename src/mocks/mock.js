import {TYPES, CITIES, getArrayFromType, DESCRIPTION} from './const.js';
import { getDates, getRandomIntInRange } from '../utils.js';

let i = 0;
let pointId = 0;
const destinations = [];

const createDestination = () => {
  const randomIndex = getRandomIntInRange(1, 100);
  const res = {
    id: ++i,
    name: CITIES[getRandomIntInRange(0, CITIES.length - 1)],
    description: DESCRIPTION[getRandomIntInRange(0, DESCRIPTION.length - 1)],
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${randomIndex}`,
        description: `Random picture number ${randomIndex}`
      }
    ]
  };
  destinations.push(res);
  return res;
};

export const getDestinationById = (id) => destinations.find((dest) => dest.id === id);

export const generatePoint = () => {
  const pointType = TYPES[getRandomIntInRange(1, TYPES.length - 1)];
  const dates = getDates();
  const offersForType = getArrayFromType(pointType);
  const dest = createDestination();
  return {
    id: ++pointId,
    type: pointType,
    destination: dest.id,
    dateFrom: dates[0],
    dateTo: dates[1],
    price: getRandomIntInRange(1100, 1900),
    offers: offersForType.slice(getRandomIntInRange(0, offersForType.length - 1))
  };
};
