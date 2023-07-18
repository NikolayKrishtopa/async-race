import { Car, WinnerType } from '../types/models';

export class Section {
  getItems: () => Promise<Array<Car | WinnerType>>;
  generateItem: (item: Car | WinnerType) => HTMLElement;
  container: HTMLDivElement;

  constructor(
    getItems: () => Promise<Array<Car>>,
    generateItem: (item: Car | WinnerType) => HTMLElement
  ) {
    this.getItems = getItems;
    this.container = document.querySelector(
      '.section__content'
    ) as HTMLDivElement;
    this.generateItem = generateItem;
    this.initiate();
  }

  renderItems = async () => {
    this.container.innerHTML = '';
    const items = await this.getItems();
    items.forEach((e: Car | WinnerType) => {
      const item = this.generateItem(e);
      this.container.append(item);
    });

    return;
  };

  generateState = () => {
    this.renderItems();
  };
  setListeners = () => {
    return;
  };

  initiate = () => {
    this.generateState();
    this.setListeners();
  };
}
