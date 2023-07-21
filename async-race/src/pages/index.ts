import './index.scss';
import App from '../components/App';
import Car from '../components/Car';
// import generateCarName from '../utils/generateCarName';
// import getRandomColor from '../utils/getRandomColor';
import carsApi from '../utils/api';
import { CarType, WinnerType, QueryParams } from '../types/models';
import Garage from '../components/Garage';
import Winners from '../components/Winners';

const getCars = async (params: QueryParams) => {
  const res: { items: CarType[]; totalQty: string } = await carsApi.getCars(
    params
  );

  return res;
};

const getWinners = async (params: QueryParams) => {
  const res: { items: WinnerType[]; totalQty: string } =
    await carsApi.getWinners(params);

  return res;
};

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

const createWinner = async (item: CarType | WinnerType) => {
  const winner = item as WinnerType;
  const res = (await carsApi.createWinner(winner))?.payload as WinnerType;
  return res;
};

const createCar = async (item: CarType | WinnerType) => {
  const car = item as CarType;
  const res = (await carsApi.createCar(car))?.payload as CarType;
  return res;
};

const deleteWinner = async (id: number) => {
  const res = (await carsApi.deleteWinner(id))?.payload as WinnerType;
  return res;
  return res;
};

const deleteCar = async (id: number) => {
  const res = (await carsApi.deleteCar(id))?.payload as CarType;
  return res;
};

const editWinner = async (id: number, payload: CarType | WinnerType) => {
  const winner = payload as WinnerType;
  const res = (await carsApi.editWinner(id, winner))?.payload as WinnerType;
  return res;
};

const editCar = async (id: number, payload: CarType | WinnerType) => {
  const car = payload as CarType;
  const res = (await carsApi.editCar(id, car))?.payload as CarType;
  return res;
};

const app = new App(
  () =>
    new Garage(
      carsApi.getCars,
      generateCarLayout,
      createCar,
      deleteCar,
      editCar
    ),
  () =>
    new Winners(
      getWinners,
      generateWinnerLayout,
      createWinner,
      deleteWinner,
      editWinner
    )
);

export default app;
