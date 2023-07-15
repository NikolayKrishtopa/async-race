import CARS from './cars';
import getRandomIndex from './getRandIndex';

export default function generateCarName() {
  const magorModel = CARS[getRandomIndex(CARS)];
  const minorModel = magorModel.models[getRandomIndex(magorModel.models)];
  return magorModel.name + ' ' + minorModel.name;
}
