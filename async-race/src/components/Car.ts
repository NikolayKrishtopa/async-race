import { CarType, EngineStatus } from '../types/models';
import flagImg from '../assets/img/flag_finish_fill.svg';
import SELECTORS from '../utils/selectors';
import APP_ADJUSTMENT from '../utils/AppAdjust';

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
  startEngine: (id: string) => Promise<EngineStatus>;
  stopEngine: (id: string) => Promise<EngineStatus>;
  drive: (id: string) => Promise<EngineStatus>;
  track: HTMLDivElement | null;
  interval: NodeJS.Timer;

  constructor(
    carData: CarType,
    onRemove: (id: string) => void,
    onEdit: (id: string) => void,
    generateCarImg: (color: string, className: string) => string,
    startEngine: (id: string) => Promise<EngineStatus>,
    stopEngine: (id: string) => Promise<EngineStatus>,
    drive: (id: string) => Promise<EngineStatus>
  ) {
    this.startEngine = startEngine;
    this.stopEngine = stopEngine;
    this.drive = drive;
    this.carData = carData;
    this.generateCarImg = generateCarImg;
    this.element = this.createLayout();
    this.startBtn = this.element.querySelector(SELECTORS.CAR_START_BTN);
    this.stopBtn = this.element.querySelector(SELECTORS.CAR_STOP_BTN);
    this.editBtn = this.element.querySelector(SELECTORS.CAR_EDIT_BTN);
    this.removeBtn = this.element.querySelector(SELECTORS.CAR_REMOVE_BTN);
    this.carPict = this.element.querySelector(SELECTORS.CAR_PICTURE);
    this.track = this.element.querySelector(SELECTORS.CAR_TRACK);
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
    this.stopBtn?.addEventListener('click', this.reset);
    this.editBtn?.addEventListener('click', this.onEdit);
    this.removeBtn?.addEventListener('click', this.onRemove);
  };

  start = async () => {
    const velocity = (await this.startEngine(this.carData.id)).velocity;
    console.log(velocity);

    if (!velocity) return;
    const time = APP_ADJUSTMENT.BASIC_RACE_TIME / velocity;
    this.animate(time);
    const status = await this.drive(this.carData.id);
    console.log(status);

    if (!status) this.stop();
  };
  stop = () => {
    if (!this.carPict) return;
    clearInterval(this.interval);
  };
  reset = () => {
    if (!this.carPict) return;
    this.stop();
    this.carPict.style.transform = `none`;
  };
  edit = () => {
    console.log(`edit ${this.carData.name}`);
  };

  animate = (duration: number) => {
    if (!this.track || !this.carPict) return;
    const length = this.track.clientWidth - this.carPict.clientWidth;
    let passed = 0;
    this.interval = setInterval(() => {
      passed += (length * 16) / duration;
      if (!this.carPict) return;
      this.carPict.style.transform = `translateX(${passed}px)`;
      if (passed >= length) {
        clearInterval(this.interval);
      }
    }, 16);
  };

  initiate = () => {
    this.setListeners();
  };
}
