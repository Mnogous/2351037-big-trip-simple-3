import { render } from './framework/render';
import Presenter from './presenter/trip-presenter.js';
import FilterView from './view/filter-view.js';
import TripModel from './model/trip-model.js';
import { generateFilter } from './mocks/sort.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripModel = new TripModel();

const filters = generateFilter(tripModel.points);
render(new FilterView(filters), filtersContainer);

const container = document.querySelector('.trip-events');
const tripPresenter = new Presenter(container, tripModel);

tripPresenter.init();
