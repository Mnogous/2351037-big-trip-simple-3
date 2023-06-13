import { render } from './framework/render.js';
import TripModel from './model/trip-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './api-service.js';

const AUTHORIZATION = 'Basic kTy9gIdsz2317rD';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const tripEventsContainer = document.querySelector('.trip-events');
const filterFormContainer = document.querySelector('.trip-controls__filters');
const pageHeaderContainer = document.querySelector('.trip-main');

const tripModel = new TripModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const listPresenter = new ListPresenter(tripEventsContainer, filterModel, tripModel);
const filterPresenter = new FilterPresenter(filterFormContainer, filterModel, tripModel);

filterPresenter.init();
listPresenter.init();

const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  listPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

filterPresenter.init();
listPresenter.init();
tripModel.init().finally(() => {
  render(newPointButtonComponent, pageHeaderContainer);
  newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
});
