import AbstractView from '../framework/view/abstract-view.js';
import { convertToDateTime } from '../utils.js';
import { convertToEventDate } from '../utils.js';
import { convertToEventDateTime } from '../utils.js';
import { convertToTime } from '../utils.js';
import { convertToUpperCase } from '../utils.js';

const getOffers = (offers) => offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');

const createRoutePointTemplate = (routePoint) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = routePoint;
  const eventDateTime = convertToEventDateTime(dateFrom);
  const eventDate = convertToEventDate(dateFrom);
  const startDateTime = convertToDateTime(dateFrom);
  const startTime = convertToTime(dateFrom);
  const endDateTime = convertToDateTime(dateTo);
  const endTime = convertToTime(dateTo);
  const offersOfPoint = getOffers(offers);

  return `<li class="trip-events__item">
  <div class="event">
  <time class="event__date" datetime="${eventDateTime}">${eventDate}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${convertToUpperCase(type)} ${destination}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${startDateTime}">${startTime}</time>
      —
      <time class="event__end-time" datetime="${endDateTime}">${endTime}</time>
    </p>
  </div>
  <p class="event__price">
    €&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${offersOfPoint}
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`;
};

export default class RoutePointView extends AbstractView {
  #routePoint = null;
  #handleEditClick = null;

  constructor({routePoint, onEditClick}) {
    super();
    this.#routePoint = routePoint;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createRoutePointTemplate(this.#routePoint);
  }

  get routePoint() {
    return this.#routePoint;
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
