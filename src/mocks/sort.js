import {SortType, FilterType} from './const.js';
import { isTripDateBeforeToday } from '../utils.js';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isTripDateBeforeToday(point.dateFrom))
};

const sort = {
  [SortType.DAY]: (points) => points,
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points,
  [SortType.PRICE]: (points) => points,
  [SortType.OFFERS]: (points) => points,
};

export const generateSort = (points) => Object.entries(sort).map(([sortName, sortPoints]) => ({
  name: sortName,
  count: sortPoints(points).length
}));

export const generateFilter = (points) => Object.entries(filter).map(([filterName, filterPoints]) => ({
  name: filterName,
  count: filterPoints(points).length,
}));
