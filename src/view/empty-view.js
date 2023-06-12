import AbstractView from '../framework/view/abstract-view.js';

const tempMsgConst = 'Click New Event to create your first point';

const createEmptyMessageTemplate = (msg) => `<p class="trip-events__msg">${msg}</p>`;

export default class EmptyView extends AbstractView {
  get template() {
    return createEmptyMessageTemplate(tempMsgConst);
  }
}
