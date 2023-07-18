import './index.scss';
import App from '../components/App';
// import generateCarName from '../utils/generateCarName';
// import getRandomColor from '../utils/getRandomColor';
import carsApi from '../utils/api';
import { Section } from '../components/Section';
import { Car, WinnerType } from '../types/models';

const getCars = async () => {
  const cars = await carsApi.getCars();

  return cars;
};

const getWinners = async () => {
  const winners = await carsApi.getWinners();

  return winners;
};

const generateCarLayout = (item: Car | WinnerType) => {
  const car = item as Car;
  const template = document.querySelector(
    '#carTemplate'
  ) as HTMLTemplateElement;
  const element = template.content.cloneNode(true) as HTMLElement;
  const title = element.querySelector('.car__title');
  if (title) {
    title.textContent = car.name;
  }
  return element;
};

const generateWinnerLayout = (item: Car | WinnerType) => {
  const winner = item as WinnerType;
  const template = document.querySelector(
    '#winnerTemplate'
  ) as HTMLTemplateElement;
  const element = template.content.cloneNode(true) as HTMLElement;
  const number = element.querySelector('.winner__text_type_number');
  // const name = element.querySelector('.winner__text_type_name');
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
  () => new Section(getCars, generateCarLayout),
  () => new Section(getWinners, generateWinnerLayout)
);

export default app;
