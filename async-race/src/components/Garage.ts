import { CarType, QueryParams } from '../types/models';

import { Section } from './Section';

export default class Garage extends Section<CarType> {
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
    generateItem: (item: CarType) => HTMLElement,
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
  }

  renderState = () => {
    super.renderState();
    this.renderControlPanelState();
  };

  renderControlPanelState = () => {
    if (!this.submitBtn) return;
    switch (!this.carToEdit) {
      case false:
        this.submitBtn.textContent = 'update';
        this.OptionalBtns?.classList.add('hidden');
        this.cancelBtn?.classList.remove('hidden');
        break;
      case true:
        this.submitBtn.textContent = 'create';
        this.OptionalBtns?.classList.remove('hidden');
        this.cancelBtn?.classList.add('hidden');
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
          <input type="text" class="control__input control__input_type_car-name" />
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
    controlPanel.classList.add('control');
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
    this.raceBtn = document.querySelector('.control__race-btn');
    this.resetBtn = document.querySelector('.control__reset-btn');
    this.generateBtn = document.querySelector('.control__generate-btn');
    this.submitBtn = document.querySelector('.control__create-btn');
    this.cancelBtn = document.querySelector('.control__cancel-btn');
    this.colorInput = document.querySelector('.control__input_type_car-color');
    this.nameInput = document.querySelector('.control__input_type_car-name');
    this.OptionalBtns = document.querySelector('.control__btns');
  };

  renderLayout = () => {
    super.renderLayout('Garage');
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
