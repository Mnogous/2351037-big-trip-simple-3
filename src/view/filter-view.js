import AbstractView from '../framework/view/abstract-view.js';
import { capitalize } from '../utils.js';

const createFilterItem = (filter) => (
  `<div class="trip-filters__filter">
  <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}">
  <label class="trip-filters__filter-label" for="filter-${filter.name}">${capitalize(filter.name)}</label>
  </div>`
);

const createFilterTemplate = (filterItems) => (
  `<form class="trip-filters" action="#" method="get">
    ${filterItems.map((item) => createFilterItem(item)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  constructor(filters) {
    super();
    this.filters = filters;
  }

  get template () {
    return createFilterTemplate(this.filters);
  }
}
