import FormCreatingView from '../view/form-creating-view.js';
import EventsListView from '../view/events-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  eventListComponent = new EventsListView();

  constructor(boardContainer, routePointsModel, destinationModel){
    this.boardContainer = boardContainer;
    this.routePointsModel = routePointsModel;
    this.destinationModel = destinationModel;
  }

  init(){
    this.boardPoits = this.routePointsModel.getRoutePoints();
    this.boardEditingForms = [...this.destinationModel.getDestinations()];

    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    for (let i = 0; i < this.boardEditingForms.length; i++) {
      render(new FormCreatingView({Destination: this.boardEditingForms[i]}), this.eventListComponent.getElement());
    }
    for (let i = 0; i < this.boardPoits.length; i++) {
      render(new RoutePointView({RoutePoint: this.boardPoits[i]}), this.eventListComponent.getElement());
    }
  }
}
