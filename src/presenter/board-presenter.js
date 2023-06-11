import { EmptyView } from '../view/empty-view.js';
import FormEditingView from '../view/form-editing-view.js';
import EventsListView from '../view/events-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  #numberOfPoints = 0;
  #boardContainer = null;
  #routePointsModel = null;
  #destinationModel = null;

  #eventListComponent = new EventsListView();

  #boardPoints = [];
  #boardEditingForms = [];

  constructor(boardContainer, routePointsModel, destinationModel){
    this.#boardContainer = boardContainer;
    this.#routePointsModel = routePointsModel;
    this.#destinationModel = destinationModel;
  }

  init(){
    this.#boardPoints = this.#routePointsModel.routePoints;
    this.#boardEditingForms = this.#destinationModel.destinations;
    this.#numberOfPoints = this.#boardPoints.length;

    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPoint(point, destination) {
    const pointComponent = new RoutePointView({point});
    const formComponent = new FormEditingView({destination});

    const replacePointToForm = () => {
      this.#eventListComponent.element.replaceChild(formComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#eventListComponent.element.replaceChild(pointComponent.element, formComponent.element);
    };

    const deletePoint = () => {
      this.#eventListComponent.element.removeChild(formComponent.element);
      formComponent.removeElement();
      pointComponent.removeElement();
      this.#numberOfPoints--;
      if (this.#numberOfPoints <= 0) {
        while (this.#boardContainer.firstChild) {
          this.#boardContainer.removeChild(this.#boardContainer.firstChild);
        }
        render(new EmptyView(), this.#boardContainer);
      }
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    formComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      deletePoint();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    formComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    formComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#eventListComponent.element);
  }
}
