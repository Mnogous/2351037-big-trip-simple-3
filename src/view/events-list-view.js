import AbstractView from '../framework/view/abstract-view.js';
import { createElement, render } from '../framework/render.js';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

const createPointListItemTemplate = () => '<li class="trip-events__item"></li>`';

export default class EventsListView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }

  addComponent(component) {
    const li = createElement(createPointListItemTemplate());
    render(component, li);
    this.element.append(li);
  }
}
