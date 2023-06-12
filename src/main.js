import { render } from './framework/render.js';
import { generateFilter } from './mocks/mock.js';
import TripModel from './model/trip-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterView from './view/filter-view.js';

const tripEventsContainer = document.querySelector('.trip-events');
const filterFormContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new TripModel();
const tripPointsPresenter = new TripPresenter(tripEventsContainer, pointsModel);

const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), filterFormContainer);
tripPointsPresenter.init();
