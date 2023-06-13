import AbstractView from '../framework/view/abstract-view.js';

const createTripPointsListTemplate = () => `
  <ul class="trip-events__list"></ul>
`;

export default class EventsListView extends AbstractView {
  get template() {
    return createTripPointsListTemplate();
  }
}
