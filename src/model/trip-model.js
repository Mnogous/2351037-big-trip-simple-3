import { generatePoint } from '../mocks/mock.js';

const TRIP_COUNT = 4;

export default class TripModel {
  #points = Array.from({length: TRIP_COUNT}, generatePoint);

  get points() {
    return this.#points;
  }
}
