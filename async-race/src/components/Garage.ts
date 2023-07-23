import { CarType, QueryParams } from '../types/models';
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

  constructor(
    getItems: (
      params: QueryParams | QueryParams
    ) => Promise<{ items: Array<CarType>; totalQty: string }>,
    generateItem: (item: CarType) => Car,
    fetchCreateItem: (item: CarType) => Promise<CarType>,
    fetchDeleteItem: (id: string) => Promise<CarType>,
    fetchEditItem: (id: string, payload: CarType) => Promise<CarType>,
    generateCarName: () => string,
    generateCarColor: () => string
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
    this.renderPage();
  }

  renderState = () => {
    super.renderState();
    this.renderControlPanelState();
  };

  renderControlPanelState = () => {
    if (!this.submitBtn) return;
    switch (!this.carToEdit) {
      case false:
        this.submitBtn.textContent = GARAGE_SUBMIT_BTN_TEXT.EDIT;
        this.OptionalBtns?.classList.add(SELECTORS.HIDDEN);
        this.cancelBtn?.classList.remove(SELECTORS.HIDDEN);
        break;
      case true:
        this.submitBtn.textContent = GARAGE_SUBMIT_BTN_TEXT.CREATE;
        this.OptionalBtns?.classList.remove(SELECTORS.HIDDEN);
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
          <button type="button" class="btn hidden control__cancel-btn">Cancel</button>

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
    this.carToEdit = null;
    this.renderControlPanelState();
  };

  setListeners = () => {
    super.setListeners();
    this.submitBtn?.addEventListener('click', this.submitCreateCar);
    this.generateBtn?.addEventListener('click', this.generateCarsPattern);
    this.cancelBtn?.addEventListener('click', this.cancelEditMode);
  };
}
