import { CarType, QueryParams, WinnerType } from '../types/models';
import APP_ADJUSTMENT from '../utils/AppAdjust';
import { APP_SECTIONS, GARAGE_SUBMIT_BTN_TEXT } from '../utils/constants';
import SELECTORS from '../utils/selectors';
import Car from './Car';

import { Section } from './Section';

export default class Garage extends Section<CarType, Car> {
  colorInput: HTMLInputElement | null;
  nameInput: HTMLInputElement | null;
  raceBtn: HTMLElement | null;
  resetBtn: HTMLElement | null;
  generateBtn: HTMLElement | null;
  submitBtn: HTMLElement | null;
  cancelBtn: HTMLElement | null;
  form: HTMLFormElement | null;
  generateCarName: () => string;
  generateCarColor: () => string;
  carToEdit: string | null;
  OptionalBtns: HTMLDivElement | null;
  status: 'race' | 'park' | 'finished';
  createWinner: (winner: WinnerType) => Promise<WinnerType>;
  updateWinner: (id: string, winner: WinnerType) => Promise<WinnerType>;
  deleteWinner: (id: string) => Promise<WinnerType>;
  getWinner: (id: string) => Promise<WinnerType>;

  constructor(
    getItems: (
      params: QueryParams | QueryParams
    ) => Promise<{ items: Array<CarType>; totalQty: string }>,
    generateItem: (item: CarType) => Car,
    fetchCreateItem: (item: CarType) => Promise<CarType>,
    fetchDeleteItem: (id: string) => Promise<CarType>,
    fetchEditItem: (id: string, payload: CarType) => Promise<CarType>,
    generateCarName: () => string,
    generateCarColor: () => string,
    createWinner: (winner: WinnerType) => Promise<WinnerType>,
    updateWinner: (id: string, winner: WinnerType) => Promise<WinnerType>,
    deleteWinner: (id: string) => Promise<WinnerType>,
    getWinner: (id: string) => Promise<WinnerType>
  ) {
    super(
      getItems,
      generateItem,
      fetchCreateItem,
      fetchDeleteItem,
      fetchEditItem
    );
    this.generateCarName = generateCarName;
    this.generateCarColor = generateCarColor;
    this.itemsPerPage = APP_ADJUSTMENT.ITEMS_PER_PAGE_CARS;
    this.status = 'park';
    this.createWinner = createWinner;
    this.updateWinner = updateWinner;
    this.deleteWinner = deleteWinner;
    this.getWinner = getWinner;
    this.renderPage();
  }

  deleteItem = async (id: string) => {
    super.deleteItem(id);
    this.deleteWinner(id);
  };

  renderState = () => {
    super.renderState();
    this.renderControlPanelState();
    this.renderRaceStatus();
  };

  renderControlPanelState = () => {
    if (!this.submitBtn) return;
    switch (!this.carToEdit) {
      case false:
        this.submitBtn.textContent = GARAGE_SUBMIT_BTN_TEXT.EDIT;
        this.OptionalBtns?.classList.add(SELECTORS.TRANSPARENT);
        this.cancelBtn?.classList.remove(SELECTORS.HIDDEN);
        break;
      case true:
        this.submitBtn.textContent = GARAGE_SUBMIT_BTN_TEXT.CREATE;
        this.OptionalBtns?.classList.remove(SELECTORS.TRANSPARENT);
        this.cancelBtn?.classList.add(SELECTORS.HIDDEN);
        break;
      default:
        break;
    }
  };

  editCar = (id: typeof this.carToEdit) => {
    this.carToEdit = id;
    this.renderState();
  };

  generateControlPanel = () => {
    const controlPanel = document.createElement('div');
    controlPanel.innerHTML = `
    <form class="control__edit">
          <input type="text" class="control__input control__input_type_text control__input_type_car-name" />
          <input type="color" class="control__input control__input_type_car-color" />
          <button type="button" class="btn control__create-btn"></button>
          <button type="button" class="btn btn_style_red hidden control__cancel-btn">Cancel</button>

        </form>
        <div class="control__btns">
          <button class="btn control__race-btn">race</button>
          <button class="btn control__reset-btn">reset</button>
          <button class="btn control__generate-btn">generate cars</button>
        </div>
    `;
    controlPanel.classList.add(SELECTORS.CONTROL);
    this.mainContainer.prepend(controlPanel);
    this.searchElements();
  };

  generateCarsPattern = async () => {
    const carsToAdd: Array<CarType> = [];

    for (let i = 0; i < 100; i += 1) {
      const car: CarType = {
        id: '',
        color: this.generateCarColor(),
        name: this.generateCarName(),
      };
      carsToAdd.push(car);
    }

    await Promise.all(carsToAdd.map((c) => this.createItem(c)));

    this.fetchItemsList();
  };

  searchElements = () => {
    super.searchElements();
    this.raceBtn = document.querySelector(SELECTORS.CONTROL_RACE_BTN);
    this.resetBtn = document.querySelector(SELECTORS.CONTROL_RESET_BTN);
    this.generateBtn = document.querySelector(SELECTORS.CONTROL_GENERATE_BTN);
    this.submitBtn = document.querySelector(SELECTORS.CONTROL_CREATE_BTN);
    this.cancelBtn = document.querySelector(SELECTORS.CONTROL_CANCEL_BTN);
    this.colorInput = document.querySelector(SELECTORS.CONTROL_COLOR_INPUT);
    this.nameInput = document.querySelector(SELECTORS.CONTROL_NAME_INPUT);
    this.OptionalBtns = document.querySelector(SELECTORS.CONTROL_OPTIONAL_BTNS);
  };

  renderLayout = () => {
    super.renderLayout(APP_SECTIONS.GARAGE);
    this.generateControlPanel();
  };

  submitCreateCar = (e: Event) => {
    e.preventDefault();
    if (!this.nameInput || !this.colorInput) return;
    const NewCarData: CarType = {
      id: '',
      name: this.nameInput.value,
      color: this.colorInput.value,
    };
    if (this.carToEdit) {
      super.editItem(this.carToEdit, NewCarData);
      this.cancelEditMode();
    } else {
      super.createItem(NewCarData);
    }
  };

  cancelEditMode = () => {
    this.items
      .find((e) => {
        if (!this.carToEdit) return;
        return e.carData.id === this.carToEdit;
      })
      ?.stopHighLight();
    this.carToEdit = null;
    this.renderControlPanelState();
  };

  renderRaceStatus = () => {
    switch (this.status) {
      case 'race':
        this.raceBtn?.classList.add(SELECTORS.BTN_INACTIVE);
        this.resetBtn?.classList.add(SELECTORS.BTN_INACTIVE);
        break;
      case 'park':
        this.raceBtn?.classList.remove(SELECTORS.BTN_INACTIVE);
        this.resetBtn?.classList.add(SELECTORS.BTN_INACTIVE);
        break;
      case 'finished':
        this.raceBtn?.classList.add(SELECTORS.BTN_INACTIVE);
        this.resetBtn?.classList.remove(SELECTORS.BTN_INACTIVE);
        break;
      default:
        break;
    }
  };

  race = () => {
    this.items.forEach((e) => e.start());
    this.status = 'race';
    this.renderRaceStatus();
  };

  reset = () => {
    Promise.allSettled(this.items.map((e) => e.reset())).then(() => {
      this.status = 'park';
      this.renderRaceStatus();
    });
  };

  registerWinner = async (id: string, time: number) => {
    if (this.status !== 'race') return;
    console.log(time);
    this.status = 'finished';
    this.renderRaceStatus();
    const match = await this.getWinner(id);
    console.log(match);

    if (match.id) {
      this.updateWinner(id, {
        id,
        time: Math.min(Number(time.toFixed(2)), match.time),
        wins: match.wins + 1,
      });
    } else {
      this.createWinner({ id, time: Number(time.toFixed(2)), wins: 1 });
    }
  };

  setListeners = () => {
    super.setListeners();
    this.submitBtn?.addEventListener('click', this.submitCreateCar);
    this.generateBtn?.addEventListener('click', this.generateCarsPattern);
    this.cancelBtn?.addEventListener('click', this.cancelEditMode);
    this.raceBtn?.addEventListener('click', this.race);
    this.resetBtn?.addEventListener('click', this.reset);
  };
}
