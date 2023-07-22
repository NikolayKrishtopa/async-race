import { CarType } from '../types/models';
import flagImg from '../assets/img/flag_finish_fill.svg';

export default class Car {
  element: HTMLElement | null;
  carData: CarType;
  startBtn: HTMLButtonElement | null;
  stopBtn: HTMLButtonElement | null;
  editBtn: HTMLButtonElement | null;
  removeBtn: HTMLButtonElement | null;
  carPict: HTMLElement | null;
  onRemove: () => void;

  constructor(carData: CarType, onRemove: (id: string) => void) {
    this.carData = carData;
    this.element = this.createLayout();
    this.startBtn = this.element.querySelector('.car__start-btn');
    this.stopBtn = this.element.querySelector('.car__stop-btn');
    this.editBtn = this.element.querySelector('.car__edit-btn');
    this.removeBtn = this.element.querySelector('.car__remove-btn');
    this.carPict = this.element.querySelector('.car__car');
    this.onRemove = () => onRemove(this.carData.id);
    this.initiate();
  }

  createLayout = () => {
    const element = document.createElement('div');
    element.classList.add('car');
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
            <div class="car__car"></div>
            <img
              src="./assets/img/flag_finish_fill.svg"
              alt="finish flag"
              class="car__finish-flag"
            />
          </div>
        </div>
    `;
    const img = element.querySelector('.car__finish-flag');
    if (img instanceof HTMLImageElement) {
      img.src = flagImg;
    }
    const title = element.querySelector('.car__title');
    if (title) {
      title.textContent = this.carData.name;
    }
    this.carPict = element.querySelector('.car__car');
    if (this.carPict) {
      this.carPict.style.backgroundColor = this.carData.color;
    }
    return element;
  };

  setListeners = () => {
    this.startBtn?.addEventListener('click', this.start);
    this.stopBtn?.addEventListener('click', this.stop);
    this.editBtn?.addEventListener('click', this.edit);
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
