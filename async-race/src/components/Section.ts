import ISection, { QueryParams } from '../types/models';
import SELECTORS from '../utils/selectors';
import nextPageIcon from '../assets/img/pagination_right.svg';
import prevPageIcon from '../assets/img/pagination_left.svg';

export class Section<
  T extends { id: string },
  U extends { element: HTMLElement | null }
> implements ISection<T, U>
{
  getItems: (
    params: QueryParams
  ) => Promise<{ items: Array<T>; totalQty: string }>;
  generateItem: (item: T) => U;
  itemsContainer: HTMLDivElement | null;
  queryParams: QueryParams;
  itemsPerPage: number;
  curPageNumField: HTMLElement | null;
  pagesQtyField: HTMLElement | null;
  itemsQtyField: HTMLElement | null;
  curPage: number;
  pagesQty: number;
  totalItemsQty: number;
  items: Array<U>;
  nextPageBtn: HTMLButtonElement | null;
  prevPageBtn: HTMLButtonElement | null;
  mainContainer: HTMLDivElement;
  fetchCreateItem: (item: T) => Promise<T>;
  fetchDeleteItem: (id: string) => Promise<T>;
  fetchEditItem: (id: string, payload: T) => Promise<T>;
  alert: HTMLDivElement | null;
  alertMsg: HTMLParagraphElement | null;

  constructor(
    getItems: (
      params: QueryParams
    ) => Promise<{ items: Array<T>; totalQty: string }>,
    generateItem: (item: T) => U,
    createItem: (item: T) => Promise<T>,
    fetchDeleteItem: (id: string) => Promise<T>,
    fetchEditItem: (id: string, payload: T) => Promise<T>
  ) {
    this.fetchCreateItem = createItem;
    this.fetchDeleteItem = fetchDeleteItem;
    this.fetchEditItem = fetchEditItem;
    this.mainContainer = document.querySelector('.section') as HTMLDivElement;
    this.prevPageBtn = null;
    this.nextPageBtn = null;
    this.curPageNumField = null;
    this.pagesQtyField = null;
    this.itemsQtyField = null;
    this.getItems = getItems;
    this.items = [];
    this.itemsContainer = null;
    this.generateItem = generateItem;
    this.itemsPerPage = 7;
    this.curPage = 1;
    this.pagesQty = 1;
    this.totalItemsQty = 0;
    this.queryParams = {
      _page: this.curPage,
      _limit: this.itemsPerPage,
    };
    this.fetchItemsList();
  }

  async createItem(item: T) {
    await this.fetchCreateItem(item);
    this.fetchItemsList();
  }

  async deleteItem(id: string) {
    await this.fetchDeleteItem(id);
    this.fetchItemsList();
  }

  async editItem(id: string, item: T) {
    await this.fetchEditItem(id, item);
    this.fetchItemsList();
  }

  searchElements() {
    this.curPageNumField = document.querySelector(SELECTORS.PAGE_NUM_FIELD);
    this.pagesQtyField = document.querySelector(SELECTORS.PAGES_QTY);
    this.itemsQtyField = document.querySelector(SELECTORS.ITEMS_QTY);
    this.prevPageBtn = document.querySelector(SELECTORS.PAGINATION_PREV_BTN);
    this.nextPageBtn = document.querySelector(SELECTORS.PAGINATION_NEXT_BTN);
    this.itemsContainer = document.querySelector(SELECTORS.SECTION_CONTENT);
    this.alert = document.querySelector(SELECTORS.ALERT);
    this.alertMsg = document.querySelector(SELECTORS.ALERT_MSG);
  }

  renderLayout(sectionName = '') {
    console.log('renderLayout');

    this.mainContainer.innerHTML = '';
    this.mainContainer.innerHTML = `
    <h2 class="section__title">
          <span class="section__name">${sectionName}</span>(<span class="section__items-qty"></span>)
        </h2>
        <div class="section__row">
          <p class="section__page">
            Page <span class="section__page-num"></span> of
            <span class="section__page-qty"></span>
          </p>
          <div class="section__pagination">
            <button class="btn btn_style_transparent section__prev-btn">
              <img class="section__pagination-icon" src=${prevPageIcon} />
            </button>
            <button class="btn btn_style_transparent section__next-btn">
              <img class="section__pagination-icon" src=${nextPageIcon} />  
            </button>
          </div>
        </div>
        <div class="section__content"></div>
        <div class="alert">
          <p class="alert__msg"></p>
        </div>
    `;
  }

  updateQueryParams() {
    this.queryParams = {
      _page: this.curPage,
      _limit: this.itemsPerPage,
    };
  }

  async fetchItemsList() {
    const res = await this.getItems(this.queryParams);
    this.items = res.items.map((item) => this.generateItem(item));
    this.totalItemsQty = Number(res.totalQty);
    this.pagesQty = Math.ceil(this.totalItemsQty / this.itemsPerPage);
    this.renderPage();
  }

  renderItems() {
    if (!this.itemsContainer) return;
    this.itemsContainer.innerHTML = '';
    this.items.forEach((e: U) => {
      if (!this.itemsContainer || !e.element) return;
      this.itemsContainer.append(e.element);
    });
  }

  renderState() {
    if (!this.curPageNumField || !this.pagesQtyField || !this.itemsQtyField)
      return;
    this.curPageNumField.textContent = this.curPage.toString();
    this.pagesQtyField.textContent = this.pagesQty.toString();
    this.itemsQtyField.textContent = this.totalItemsQty.toString();
    this.renderPaginationBtns;
  }

  renderPaginationBtns = () => {
    if (this.pagesQty === 1) {
      this.prevPageBtn?.classList.add(SELECTORS.BTN_INACTIVE);
      this.nextPageBtn?.classList.add(SELECTORS.BTN_INACTIVE);
    } else if (this.curPage === this.pagesQty) {
      this.prevPageBtn?.classList.remove(SELECTORS.BTN_INACTIVE);
      this.nextPageBtn?.classList.add(SELECTORS.BTN_INACTIVE);
    } else if (this.curPage === 1) {
      this.prevPageBtn?.classList.add(SELECTORS.BTN_INACTIVE);
      this.nextPageBtn?.classList.remove(SELECTORS.BTN_INACTIVE);
    } else {
      this.prevPageBtn?.classList.remove(SELECTORS.BTN_INACTIVE);
      this.nextPageBtn?.classList.remove(SELECTORS.BTN_INACTIVE);
    }
  };

  showAlert = (msg: string) => {
    console.log(this.alert);
    console.log(this.alertMsg);

    if (!this.alert || !this.alertMsg) return;
    this.alertMsg.textContent = msg;
    this.alert.classList.add(SELECTORS.ALERT_ACTIVE);
  };

  hideAlert = () => {
    if (!this.alert || !this.alertMsg) return;
    this.alertMsg.textContent = '';
    this.alert.classList.remove(SELECTORS.ALERT_ACTIVE);
  };

  renderPage = () => {
    this.unsetListeners();
    this.renderLayout();
    this.searchElements();
    this.renderItems();
    this.renderState();
    this.renderPaginationBtns();
    this.setListeners();
  };

  setListeners() {
    if (!this.nextPageBtn || !this.prevPageBtn) return;
    this.nextPageBtn.addEventListener('click', this.incPage);
    this.prevPageBtn.addEventListener('click', this.decPage);
  }
  unsetListeners = () => {
    if (!this.nextPageBtn || !this.prevPageBtn) return;
    this.nextPageBtn.removeEventListener('click', this.incPage);
    this.prevPageBtn.removeEventListener('click', this.decPage);
  };

  incPage = () => {
    if (this.curPage < this.pagesQty) {
      this.curPage += 1;
      this.updateQueryParams();
      this.fetchItemsList();
    }
  };

  decPage = () => {
    if (this.curPage > 1) {
      this.curPage -= 1;
      this.updateQueryParams();
      this.fetchItemsList();
    }
  };
}
