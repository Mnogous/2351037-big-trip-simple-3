import dayjs from 'dayjs';
import { FilterType } from './const.js';

export const getDate = (date) => dayjs(date).format('MMM D');
export const getTime = (date) => dayjs(date).format('HH-mm');
export const getFullDataTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'm');

export const sortDays = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const sortPrices = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const isDateFuture = (date) => {
  const currentDate = dayjs();
  const targetDate = dayjs(date);
  return targetDate.isAfter(currentDate, 'm');
};

export const Filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point.dateTo)),
};

export const isFormValid = (state, availableDestinations) => {
  const allIds = Object.keys(availableDestinations);

  return (allIds.includes(`${state.destination - 1}`) && /^\d+$/.test(state.basePrice));
};
