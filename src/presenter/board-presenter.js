import { FormCreatingView } from '../view/form-creating-view.js';
import { FormEditingView } from '../view/form-editing-view.js';
import { EventsListView } from '../view/events-list-view.js';
import { RoutePointView } from '../view/route-point-view.js';
import { SortView } from '../view/sort-view.js';
import { render } from '../render.js';


export default class BoardPresenter {
  eventListComponent = new EventsListView();

  constructor(boardContainer){
    this.boardContainer = boardContainer;
  }

  init(){
    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new FormEditingView(), this.eventListComponent.getElement());
    render(new FormCreatingView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++){
      render(new RoutePointView(), this.eventListComponent.getElement());
    }
  }
}
