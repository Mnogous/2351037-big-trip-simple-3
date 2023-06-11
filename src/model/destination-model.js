import {getDestination} from '../mocks/destination-mock';

const DESTINATION_COUNT = 1;

export default class DestinationModel {
  destinations = Array.from({length: DESTINATION_COUNT}, getDestination);

  getDestinations() {
    return this.destinations;
  }
}
