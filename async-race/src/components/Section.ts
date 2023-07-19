import {
  Car,
  QueryParams,
  WinnerType,
  WinnersQueryParams,
} from '../types/models';

export class Section {
  getItems: (
    params: QueryParams | WinnersQueryParams
  ) => Promise<{ items: Array<Car | WinnerType>; totalQty: string }>;
  generateItem: (item: Car | WinnerType) => HTMLElement;
  container: HTMLDivElement;
  queryParams: QueryParams | WinnersQueryParams;
  itemsPerPage: number;
  curPageNumField: HTMLElement;
  pagesQtyField: HTMLElement;
  itemsQtyField: HTMLElement;
  curPage: number;
  pagesQty: number;
  totalItemsQty: number;
  items: Array<Car | WinnerType>;

  constructor(
    getItems: (
      params: QueryParams | WinnersQueryParams
    ) => Promise<{ items: Array<Car | WinnerType>; totalQty: string }>,
    generateItem: (item: Car | WinnerType) => HTMLElement
  ) {
    this.getItems = getItems;
    this.items = [];
    this.container = document.querySelector(
      '.section__content'
    ) as HTMLDivElement;
    this.generateItem = generateItem;
    this.itemsPerPage = 7;
    this.curPage = 1;
    this.pagesQty = 1;
    this.totalItemsQty = 0;
    this.queryParams = {
      _page: this.curPage,
      _limit: this.itemsPerPage,
    };
    this.curPageNumField = document.querySelector(
      '.section__page-num'
    ) as HTMLElement;
    this.pagesQtyField = document.querySelector(
      '.section__page-qty'
    ) as HTMLElement;
    this.itemsQtyField = document.querySelector(
      '.section__items-qty'
    ) as HTMLElement;

    this.initiate();
  }

  fetchItemsList = async () => {
    this.container.innerHTML = '';
    const res = await this.getItems(this.queryParams);

    this.items = res.items;
    this.totalItemsQty = Number(res.totalQty);
    this.pagesQty = Math.ceil(this.totalItemsQty / this.itemsPerPage);
    this.renderPage();
  };
  renderItems = async () => {
    this.items.forEach((e: Car | WinnerType) => {
      const item = this.generateItem(e);
      this.container.append(item);
    });
  };

  renderState = () => {
    this.curPageNumField.textContent = this.curPage.toString();
    this.pagesQtyField.textContent = this.pagesQty.toString();
    this.itemsQtyField.textContent = this.totalItemsQty.toString();
  };

  renderPage = () => {
    this.renderItems();
    this.renderState();
  };

  setListeners = () => {
    return;
  };

  initiate = () => {
    this.fetchItemsList();
    this.renderPage();
    this.setListeners();
  };
}
