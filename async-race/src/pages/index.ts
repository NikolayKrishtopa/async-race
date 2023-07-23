import './index.scss';
import App from '../components/App';
import Car from '../components/Car';
import carsApi from '../utils/api';
import { CarType, WinnerType } from '../types/models';
import Garage from '../components/Garage';
import Winners from '../components/Winners';
import generateCarName from '../utils/generateCarName';
import getRandomColor from '../utils/getRandomColor';
import getSvg from '../utils/getSvg';
import Winner from '../components/Winner';

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
          },
          getSvg,
          carsApi.startEngine,
          carsApi.stopEngine,
          carsApi.drive
        ),
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
      (winner: WinnerType) => new Winner(winner, getSvg, carsApi.getCar),
      carsApi.createWinner,
      carsApi.deleteWinner,
      carsApi.editWinner
    )
);

export default app;
