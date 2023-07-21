import './index.scss';
import App from '../components/App';
import Car from '../components/Car';
import carsApi from '../utils/api';
import { CarType, WinnerType } from '../types/models';
import Garage from '../components/Garage';
import Winners from '../components/Winners';

const generateCarLayout = (item: CarType | WinnerType) => {
  const car = item as CarType;
  return new Car(car).element as HTMLElement;
};

const generateWinnerLayout = (item: CarType | WinnerType) => {
  const winner = item as WinnerType;
  const template = document.querySelector(
    '#winnerTemplate'
  ) as HTMLTemplateElement;
  const element = template.content.cloneNode(true) as HTMLElement;
  const number = element.querySelector('.winner__text_type_number');
  const wins = element.querySelector('.winner__text_type_wins');
  const bestTime = element.querySelector('.winner__text_type_best-time');
  if (number && wins && bestTime && winner.id) {
    number.textContent = winner.id.toString();
    wins.textContent = winner.wins.toString();
    bestTime.textContent = winner.time.toString();
  }
  return element;
};

const app = new App(
  () =>
    new Garage(
      carsApi.getCars,
      generateCarLayout,
      carsApi.createCar,
      carsApi.deleteCar,
      carsApi.editCar
    ),
  () =>
    new Winners(
      carsApi.getWinners,
      generateWinnerLayout,
      carsApi.createWinner,
      carsApi.deleteWinner,
      carsApi.editWinner
    )
);

export default app;
