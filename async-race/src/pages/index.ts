import './index.scss';
import App from '../components/App';
import Car from '../components/Car';
import carsApi from '../utils/api';
import { CarType, WinnerType } from '../types/models';
import Garage from '../components/Garage';
import Winners from '../components/Winners';
import generateCarName from '../utils/generateCarName';
import getRandomColor from '../utils/getRandomColor';

const generateWinnerLayout = (winner: WinnerType) => {
  const element = document.createElement('div');
  element.classList.add('winner');
  element.innerHTML = `
   <p class="winner__text winner__text_type_number"></p>
        <!-- <img src="#" alt="car icon" class="winner__icon" /> -->
        <p class="winner__text winner__text_type_name"></p>
        <p class="winner__text winner__text_type_wins"></p>
        <p class="winner__text winner__text_type_best-time"></p>
  `;
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
  () => {
    const garage = new Garage(
      carsApi.getCars,
      (car: CarType) =>
        new Car(
          car,
          (id: string) => {
            garage.deleteItem(id);
          },
          (id: string) => {
            garage.editCar(id);
          }
        ).element as HTMLElement,
      carsApi.createCar,
      carsApi.deleteCar,
      carsApi.editCar,
      generateCarName,
      getRandomColor
    );
    return garage;
  },

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
