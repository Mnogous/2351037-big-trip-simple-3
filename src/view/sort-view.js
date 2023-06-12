import AbstractView from '../framework/view/abstract-view.js';
import { capitalize } from '../utils.js';
import { SortType } from '../mocks/const.js';

const createItemTemplate = (sort, status) => `
<div class="trip-sort__item  trip-sort__item--${sort}">
<input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${status}>
<label class="trip-sort__btn" for="sort-${sort}">${capitalize(sort)}</label>
</div>`;

const createSortTemplate = (activeSort) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createItemTemplate(SortType.DAY, activeSort === SortType.DAY ? 'checked' : '')}
  ${createItemTemplate(SortType.EVENT, 'disabled')}
  ${createItemTemplate(SortType.TIME, 'disabled')}
  ${createItemTemplate(SortType.PRICE, activeSort === SortType.PRICE ? 'checked' : '')}
  ${createItemTemplate(SortType.OFFERS, 'disabled')}
  </form>`
);

export default class SortView extends AbstractView {
  #activeSort = SortType.DAY;

  get template() {
    return createSortTemplate(this.#activeSort);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#activeSort = evt.target.outerText.toLowerCase();
    this._callback.sortTypeChange(evt.target.outerText.toLowerCase());
  };
}
