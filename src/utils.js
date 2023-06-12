import dayjs from 'dayjs';

export function getRandomIntInRange(min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const fullDate = (date) => date.format('YYYY-MM-DD HH:mm');
export const getTime = (date) => date.format('HH:mm');
export const getWithoutTime = (date) => date.format('YYYY-MM-DD');
export const shortDate = (date) => date.format('MMM D');

export const capitalize = (type) => type.charAt(0).toUpperCase() + type.slice(1);
export const isTripDateBeforeToday = (date) => date.isBefore(dayjs(), 'D') || date.isSame(dayjs(), 'D');

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const getDates = () => {
  const start = getRandomIntInRange(1, 15);
  const end = getRandomIntInRange(16, 31);
  return [dayjs().add(start, 'd'), dayjs().add(end, 'd')];
};
