import { CarType } from '../types/models';

export default class Car {
  element: HTMLElement | null;
  carData: CarType;
  startBtn: HTMLButtonElement | null;
  stopBtn: HTMLButtonElement | null;
  editBtn: HTMLButtonElement | null;
  removeBtn: HTMLButtonElement | null;
  carPict: HTMLElement | null;

  constructor(carData: CarType) {
    this.carData = carData;
    this.element = this.createLayout();
    this.startBtn = this.element.querySelector('.car__start-btn');
    this.stopBtn = this.element.querySelector('.car__stop-btn');
    this.editBtn = this.element.querySelector('.car__edit-btn');
    this.removeBtn = this.element.querySelector('.car__remove-btn');
    this.carPict = this.element.querySelector('.car__car');
    this.initiate();
    console.log(this.carData);
  }

  createLayout = () => {
    const template = document.querySelector(
      '#carTemplate'
    ) as HTMLTemplateElement;
    const element = template.content.cloneNode(true) as HTMLElement;
    const title = element.querySelector('.car__title');
    if (title) {
      title.textContent = this.carData.name;
    }
    this.carPict = element.querySelector('.car__car');
    if (this.carPict) {
      console.log(this.carPict.style.backgroundColor);

      this.carPict.style.backgroundColor = this.carData.color;
    }
    return element;
  };

  setListeners = () => {
    this.startBtn?.addEventListener('click', this.start);
    this.stopBtn?.addEventListener('click', this.stop);
    this.editBtn?.addEventListener('click', this.edit);
    this.removeBtn?.addEventListener('click', this.remove);
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
  remove = () => {
    console.log(`remove ${this.carData.name}`);
  };

  initiate = () => {
    this.setListeners();
  };
}
