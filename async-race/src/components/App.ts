import { CarType, WinnerType } from '../types/models';
import { Section } from './Section';

class App {
  container: HTMLElement;
  mode: 'garage' | 'winners';
  garageBtn: HTMLButtonElement | null;
  winnersBtn: HTMLButtonElement | null;
  createGarage: () => Section<CarType>;
  createWinners: () => Section<WinnerType>;
  content: HTMLElement;
  garage: Section<CarType> | null;
  winners: Section<WinnerType> | null;

  constructor(
    createGarage: () => Section<CarType>,
    createWinners: () => Section<WinnerType>
  ) {
    this.container = document.querySelector('.root') as HTMLElement;
    this.mode = 'garage';
    this.garageBtn = null;
    this.winnersBtn = null;
    this.garage = null;
    this.winners = null;
    this.createGarage = createGarage;
    this.createWinners = createWinners;
    this.content = document.querySelector('.main') as HTMLElement;
    this.initiate();
  }

  createHeaderLayout = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
     <h1 class="header__title">ASYNC RACE</h1>
      <div class="header__btn-wrapper">
        <button class="header__link" id="garageBtn">Garage</button>
        <button class="header__link" id="winnersBtn">Winners</button>
      </div>
    `;
    this.container.prepend(header);
    this.garageBtn = document.querySelector('#garageBtn') as HTMLButtonElement;
    this.winnersBtn = document.querySelector(
      '#winnersBtn'
    ) as HTMLButtonElement;
    this.renderMode();
  };

  renderMode = () => {
    if (!this.garageBtn || !this.winnersBtn) return;
    if (this.mode === 'garage') {
      this.garageBtn.classList.add('header__link_state_active');
      this.winnersBtn.classList.remove('header__link_state_active');
    } else if (this.mode === 'winners') {
      this.winnersBtn.classList.add('header__link_state_active');
      this.garageBtn.classList.remove('header__link_state_active');
    }
    this.renderContent();
  };

  renderContent = () => {
    // this.content.innerHTML = '';
    if (this.mode === 'garage') {
      if (!this.garage) {
        this.garage = this.createGarage();
      } else {
        this.garage.renderPage();
      }
    } else if (this.mode === 'winners') {
      if (!this.winners) {
        this.winners = this.createWinners();
      } else {
        this.winners.renderPage();
      }
    }
  };

  setMode = (mode: typeof this.mode) => {
    this.mode = mode;
    this.renderMode();
  };

  setListeners = () => {
    if (!this.garageBtn || !this.winnersBtn) return;
    this.garageBtn.addEventListener('click', () => this.setMode('garage'));
    this.winnersBtn.addEventListener('click', () => this.setMode('winners'));
  };

  createLayout = () => {
    this.createHeaderLayout();
  };

  initiate = () => {
    this.createLayout();
    this.setListeners();
  };
}

export default App;
