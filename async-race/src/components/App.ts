import { CarType, WinnerType, AppModes } from '../types/models';
import { Section } from './Section';
import SELECTORS from '../utils/selectors';

class App {
  container: HTMLElement;
  mode: AppModes;
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
    this.container = document.querySelector(SELECTORS.ROOT) as HTMLElement;
    this.mode = AppModes.GARAGE;
    this.garageBtn = null;
    this.winnersBtn = null;
    this.garage = null;
    this.winners = null;
    this.createGarage = createGarage;
    this.createWinners = createWinners;
    this.initiate();
  }

  createHeaderLayout = () => {
    const header = document.createElement(SELECTORS.HEADER);
    header.classList.add(SELECTORS.HEADER);
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
  };

  createMainLayout = () => {
    const main = document.createElement(SELECTORS.MAIN);
    main.classList.add(SELECTORS.MAIN);
    main.innerHTML = `
     <div class="section"></div>
    `;
    this.container.append(main);
  };

  renderMode = () => {
    if (!this.garageBtn || !this.winnersBtn) return;
    if (this.mode === AppModes.GARAGE) {
      this.garageBtn.classList.add(SELECTORS.HEADER_LINK_ACTIVE);
      this.winnersBtn.classList.remove(SELECTORS.HEADER_LINK_ACTIVE);
    } else if (this.mode === AppModes.WINNERS) {
      this.winnersBtn.classList.add(SELECTORS.HEADER_LINK_ACTIVE);
      this.garageBtn.classList.remove(SELECTORS.HEADER_LINK_ACTIVE);
    }
    this.renderContent();
  };

  renderContent = () => {
    if (this.mode === AppModes.GARAGE) {
      if (!this.garage) {
        this.garage = this.createGarage();
      } else {
        this.garage.renderPage();
      }
    } else if (this.mode === AppModes.WINNERS) {
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
    this.garageBtn.addEventListener('click', () =>
      this.setMode(AppModes.GARAGE)
    );
    this.winnersBtn.addEventListener('click', () =>
      this.setMode(AppModes.WINNERS)
    );
  };

  createLayout = () => {
    this.createHeaderLayout();
    this.createMainLayout();
    this.renderMode();
  };

  initiate = () => {
    this.createLayout();
    this.setListeners();
  };
}

export default App;
