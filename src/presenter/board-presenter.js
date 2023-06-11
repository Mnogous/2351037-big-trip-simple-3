import EmptyView from '../view/empty-view.js';
import FormCreatingView from '../view/form-creating-view.js';
import FormEditingView from '../view/form-editing-view.js';
import EventsListView from '../view/events-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import AddButtonView from '../view/add-button-view';
import {render, RenderPosition} from '../framework/render.js';
import { getDestination } from '../mocks/destination-mock.js';
import {getRoutePoint, comparePointsByPriceHihgLow, comparePointsByDateLowHigh } from '../mocks/route-point-mock.js';
import FilterView from '../view/filter-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #routePointsModel = null;
  #destinationModel = null;

  #eventListComponent = new EventsListView();

  #boardPoints = [];
  #boardEditingForms = [];

  #filterContainer = document.querySelector('.trip-controls__filters');
  #currentDate = new Date().toJSON();
  #boardFuturePoints = [];
  #isFuture = false;

  constructor(boardContainer, routePointsModel, destinationModel){
    this.#boardContainer = boardContainer;
    this.#routePointsModel = routePointsModel;
    this.#destinationModel = destinationModel;
  }

  init(){
    this.#boardPoints = this.#routePointsModel.routePoints;
    this.#boardEditingForms = this.#destinationModel.destinations;
    this.#renderBoard();
  }

  #renderPoint(routePoint, formEditing) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new RoutePointView({
      routePoint,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formComponent = new FormEditingView({
      formEditing,
      onSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onDeleteClick: () => {
        deletePoint.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onRollUpClick: () => {
        replaceFormToPoint.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      pointComponent.element.replaceWith(formComponent.element);
    }

    function replaceFormToPoint() {
      formComponent.element.replaceWith(pointComponent.element);
    }

    function deletePoint() {
      for (const point of this.#boardPoints){
        if (point.id === pointComponent.routePoint.id) {
          this.#boardPoints = this.#boardPoints.filter((el) => el.id !== point.id);
        }
      }
      formComponent.element.remove();
      pointComponent.element.remove();
      formComponent.removeElement();
      pointComponent.removeElement();
      if (this.#boardPoints.length <= 0) {
        while (this.#boardContainer.firstChild) {
          this.#boardContainer.removeChild(this.#boardContainer.firstChild);
        }
        render(new EmptyView(), this.#boardContainer);
      }
    }
    render(pointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    const newSortingView = new SortView({
      onDateChange: () => {
        sortByDateLowHigh.call(this);
      },
      onPriceChange: () => {
        sortByPriceHighLow.call(this);
      }
    });

    function addNewSortingView(){
      render(newSortingView, this.#boardContainer, RenderPosition.AFTERBEGIN);
    }

    function sortByPriceHighLow() {
      if (!this.#isFuture){
        this.#boardPoints.sort(comparePointsByPriceHihgLow);
        renderPoints.call(this);
      } else {
        this.#boardFuturePoints.sort(comparePointsByPriceHihgLow);
        renderPoints.call(this);
      }
    }

    function sortByDateLowHigh() {
      if (!this.#isFuture){
        this.#boardPoints.sort(comparePointsByDateLowHigh);
        renderPoints.call(this);
      } else {
        this.#boardFuturePoints.sort(comparePointsByDateLowHigh);
        renderPoints.call(this);
      }
    }

    const newFilterView = new FilterView({
      onEverythingChange: () => {
        this.#isFuture = false;
        renderPoints.call(this);
        newSortingView.element[0].checked = true;
        sortByDateLowHigh.call(this);
      },
      onFutureChange: () => {
        this.#isFuture = true;
        renderPoints.call(this);
        newSortingView.element[0].checked = true;
        sortByDateLowHigh.call(this);
      }
    });

    render(newFilterView, this.#filterContainer);

    new AddButtonView({
      onClick: () => {
        if (this.#boardPoints.length === 0){
          addNewPointRemoveEmptyBanner.call(this);
        } else {
          addNewPoint.call(this);
        }
      }
    });

    function addNewPointRemoveEmptyBanner() {
      while (this.#boardContainer.firstChild) {
        this.#boardContainer.removeChild(this.#boardContainer.firstChild);
      }
      addNewSortingView.call(this);
      render(this.#eventListComponent, this.#boardContainer);
      addNewPoint.call(this);
    }

    function addNewPoint() {
      const escKeyDownHandlerEdit = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          deleteForm.call(this);
          document.removeEventListener('keydown', escKeyDownHandlerEdit);
        }
      };

      document.addEventListener('keydown', escKeyDownHandlerEdit);

      const formCreating = new FormCreatingView({
        onSubmit: () => {
          const newRoutePoint = getRoutePoint();
          const newEditingForm = getDestination();
          this.#boardPoints = [...this.#boardPoints,newRoutePoint];
          this.#boardEditingForms = [...this.#boardEditingForms,newEditingForm];
          deleteForm.call(this);
          this.#renderPoint(newRoutePoint, newEditingForm);
          if (newSortingView.element[0].checked) {
            sortByDateLowHigh.call(this);
          } else {
            sortByPriceHighLow.call(this);
          }
          document.removeEventListener('keydown', escKeyDownHandlerEdit);
        },
        onDeleteClick: () => {
          deleteForm.call(this);
          document.removeEventListener('keydown', escKeyDownHandlerEdit);
        }
      });

      render(formCreating, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);

      function deleteForm() {
        formCreating.element.remove();
        formCreating.removeElement();
        if (this.#boardPoints.length <= 0) {
          while (this.#boardContainer.firstChild) {
            this.#boardContainer.removeChild(this.#boardContainer.firstChild);
          }
          render(new EmptyView(),this.#boardContainer);
        }
      }
    }
    render(this.#eventListComponent, this.#boardContainer);
    addNewSortingView.call(this);
    this.#boardPoints.sort(comparePointsByDateLowHigh);
    renderPoints.call(this);

    function renderPoints() {
      while (this.#eventListComponent.element.firstChild) {
        this.#eventListComponent.element.removeChild(this.#eventListComponent.element.firstChild);
      }
      if (!this.#isFuture) {
        for (let i = 0; i < this.#boardPoints.length; i++) {
          this.#renderPoint(this.#boardPoints[i], this.#boardEditingForms[i]);
        }
      } else {
        this.#boardFuturePoints = this.#boardFuturePoints.filter((point) => point.dateFrom >= this.#currentDate);
        for (let i = 0; i < this.#boardFuturePoints.length; i++) {
          this.#renderPoint(this.#boardFuturePoints[i], this.#boardEditingForms[i]);
        }
      }
    }
  }
}
