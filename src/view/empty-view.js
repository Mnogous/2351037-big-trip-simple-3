import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mocks/const.js';

const messages = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyMessageTemplate = (filterType) => `<p class="trip-events__msg">${messages[filterType]}</p>`;

export default class EmptyView extends AbstractView {
  #filterType = null;

  constructor (filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyMessageTemplate(this.#filterType);
  }
}
