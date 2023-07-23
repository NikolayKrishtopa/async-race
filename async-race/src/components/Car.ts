import { CarType } from '../types/models';
import flagImg from '../assets/img/flag_finish_fill.svg';
import SELECTORS from '../utils/selectors';

export default class Car {
  element: HTMLElement | null;
  carData: CarType;
  startBtn: HTMLButtonElement | null;
  stopBtn: HTMLButtonElement | null;
  editBtn: HTMLButtonElement | null;
  removeBtn: HTMLButtonElement | null;
  carPict: HTMLElement | null;
  onRemove: () => void;
  onEdit: () => void;
  generateCarImg: (color: string, claassName: string) => string;

  constructor(
    carData: CarType,
    onRemove: (id: string) => void,
    onEdit: (id: string) => void,
    generateCarImg: (color: string, className: string) => string
  ) {
    this.carData = carData;
    this.generateCarImg = generateCarImg;
    this.element = this.createLayout();
    this.startBtn = this.element.querySelector(SELECTORS.CAR_START_BTN);
    this.stopBtn = this.element.querySelector(SELECTORS.CAR_STOP_BTN);
    this.editBtn = this.element.querySelector(SELECTORS.CAR_EDIT_BTN);
    this.removeBtn = this.element.querySelector(SELECTORS.CAR_REMOVE_BTN);
    this.carPict = this.element.querySelector(SELECTORS.CAR_PICTURE);
    this.onRemove = () => onRemove(this.carData.id);
    this.onEdit = () => onEdit(this.carData.id);
    this.initiate();
  }

  createLayout = () => {
    const element = document.createElement('div');
    element.classList.add(SELECTORS.CAR);
    element.innerHTML = `
    <div class="car__heading">
          <button class="btn car__edit-btn">edit</button>
          <button class="btn car__remove-btn">remove</button>
          <h3 class="car__title">Tesla model s</h3>
        </div>
        <div class="car__main">
          <div class="car__nav">
            <button class="car__btn car__start-btn">A</button>
            <button class="car__btn car__stop-btn">B</button>
          </div>
          <div class="car__track">
            ${this.generateCarImg(
              this.carData.color,
              SELECTORS.CAR_PICTURE_CLASS
            )}
            <img
              src="./assets/img/flag_finish_fill.svg"
              alt="finish flag"
              class="car__finish-flag"
            />
          </div>
        </div>
    `;
    const finishImg = element.querySelector(SELECTORS.FLAG);
    if (finishImg instanceof HTMLImageElement) {
      finishImg.src = flagImg;
    }
    const title = element.querySelector(SELECTORS.CAR_TITLE);
    if (title) {
      title.textContent = this.carData.name;
    }
    return element;
  };

  setListeners = () => {
    this.startBtn?.addEventListener('click', this.start);
    this.stopBtn?.addEventListener('click', this.stop);
    this.editBtn?.addEventListener('click', this.onEdit);
    this.removeBtn?.addEventListener('click', this.onRemove);
  };

  start = () => {
    console.log(`start ${this.carData.name}`);
  };
  stop = () => {
    console.log(`stop ${this.carData.name}`);
  };
  edit = () => {
    console.log(`edit ${this.carData.name}`);
  };

  initiate = () => {
    this.setListeners();
  };
}
