import { CarType, QueryParams } from '../types/models';

import { Section } from './Section';

export default class Garage extends Section<CarType> {
  colorInput: HTMLInputElement | null;
  nameInput: HTMLInputElement | null;
  raceBtn: HTMLElement | null;
  resetBtn: HTMLElement | null;
  generateBtn: HTMLElement | null;
  createBtn: HTMLElement | null;
  form: HTMLFormElement | null;

  constructor(
    getItems: (
      params: QueryParams | QueryParams
    ) => Promise<{ items: Array<CarType>; totalQty: string }>,
    generateItem: (item: CarType) => HTMLElement,
    fetchCreateItem: (item: CarType) => Promise<CarType>,
    fetchDeleteItem: (id: string) => Promise<CarType>,
    fetchEditItem: (id: string, payload: CarType) => Promise<CarType>
  ) {
    super(
      getItems,
      generateItem,
      fetchCreateItem,
      fetchDeleteItem,
      fetchEditItem
    );
  }

  generateControlPanel = () => {
    console.log('control');

    const controlPanel = document.createElement('div');
    controlPanel.innerHTML = `
    <form class="control__edit">
          <input type="text" class="control__input control__input_type_car-name" />
          <input type="color" class="control__input control__input_type_car-color" />
          <button type="button" class="btn control__create-btn">create</button>
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

  searchElements = () => {
    super.searchElements();
    this.raceBtn = document.querySelector('.control__race-btn');
    this.resetBtn = document.querySelector('.control__reset-btn');
    this.generateBtn = document.querySelector('.control__generate-btn');
    this.createBtn = document.querySelector('.control__create-btn');
    this.colorInput = document.querySelector('.control__input_type_car-color');
    this.nameInput = document.querySelector('.control__input_type_car-name');
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
    super.createItem(NewCarData);
  };

  setListeners = () => {
    super.setListeners();
    this.createBtn?.addEventListener('click', this.submitCreateCar);
    console.log(this.createBtn);

    console.log('setListeners');
  };
}
