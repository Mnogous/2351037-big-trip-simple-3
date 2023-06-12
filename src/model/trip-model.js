import { generatePoints } from '../mocks/mock.js';

const POINT_COUNT = 4;

export default class TripModel {
  #points = [];

  constructor() {
    this.#points.push(...generatePoints(POINT_COUNT));
  }

  get points() {
    return this.#points;
  }
}
