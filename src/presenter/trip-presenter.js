import {render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EmptyView from '../view/empty-view.js';
import { generateSort } from '../mocks/sort.js';
import { updateItem } from '../utils.js';

export default class Presenter {
  #pointsListComponent = new EventsListView();
  #emptyListComponent = new EmptyView();
  #container = null;
  #tripModel = null;
  #pointsList = [];
  #pointPresenter = new Map();

  constructor(container, tripModel) {
    this.#container = container;
    this.#tripModel = tripModel;
  }

  init() {
    this.#pointsList = this.#tripModel.points;
    this.sortingComponent = new SortView(generateSort(this.#pointsList));
    this.#renderPage();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderEmptyList() {
    render(new this.#emptyListComponent, this.#container);
  }

  #renderSort() {
    render(this.sortingComponent, this.#container);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPage() {
    this.#renderSort();
    render(this.#pointsListComponent, this.#container);
    if(this.#pointsList.length === 0) {
      this.#renderEmptyList();
    } else {
      for (let i = 0; i < this.#pointsList.length; i++) {
        this.#renderPoint(this.#pointsList[i]);
      }
    }
  }
}
