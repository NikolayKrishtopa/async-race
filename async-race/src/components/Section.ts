import ISection, { QueryParams } from '../types/models';

export class Section<T extends { id: string }> implements ISection<T> {
  getItems: (
    params: QueryParams
  ) => Promise<{ items: Array<T>; totalQty: string }>;
  generateItem: (item: T) => HTMLElement;
  itemsContainer: HTMLDivElement | null;
  queryParams: QueryParams;
  itemsPerPage: number;
  curPageNumField: HTMLElement | null;
  pagesQtyField: HTMLElement | null;
  itemsQtyField: HTMLElement | null;
  curPage: number;
  pagesQty: number;
  totalItemsQty: number;
  items: Array<T>;
  nextPageBtn: HTMLButtonElement | null;
  prevPageBtn: HTMLButtonElement | null;
  mainContainer: HTMLDivElement;
  fetchCreateItem: (item: T) => Promise<T>;
  fetchDeleteItem: (id: number) => Promise<T>;
  fetchEditItem: (id: number, payload: T) => Promise<T>;
  constructor(
    getItems: (
      params: QueryParams
    ) => Promise<{ items: Array<T>; totalQty: string }>,
    generateItem: (item: T) => HTMLElement,
    createItem: (item: T) => Promise<T>,
    fetchDeleteItem: (id: number) => Promise<T>,
    fetchEditItem: (id: number, payload: T) => Promise<T>
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

  removeItem = async (id: number) => {
    await this.fetchDeleteItem(id);
    this.fetchItemsList();
  };
  editItem = async (id: number, item: T) => {
    await this.fetchEditItem(id, item);
    this.fetchItemsList();
  };

  searchElements() {
    this.curPageNumField = document.querySelector('.section__page-num');
    this.pagesQtyField = document.querySelector('.section__page-qty');
    this.itemsQtyField = document.querySelector('.section__items-qty');
    this.queryParams = {
      _page: this.curPage,
      _limit: this.itemsPerPage,
    };
    this.prevPageBtn = document.querySelector('.section__prev-btn');
    this.nextPageBtn = document.querySelector('.section__next-btn');
    this.itemsContainer = document.querySelector('.section__content');
  }

  renderLayout(sectionName = '') {
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
            <button class="btn section__prev-btn">prev</button>
            <button class="btn section__next-btn">next</button>
          </div>
        </div>
        <div class="section__content"></div>
    `;
  }

  updateQueryParams = () => {
    this.queryParams = {
      _page: this.curPage,
      _limit: this.itemsPerPage,
    };
  };

  fetchItemsList = async () => {
    const res = await this.getItems(this.queryParams);
    this.items = res.items;
    this.totalItemsQty = Number(res.totalQty);
    this.pagesQty = Math.ceil(this.totalItemsQty / this.itemsPerPage);
    this.renderPage();
  };

  renderItems = () => {
    if (!this.itemsContainer) return;
    this.itemsContainer.innerHTML = '';
    this.items.forEach((e: T) => {
      const item = this.generateItem(e);
      if (!this.itemsContainer) return;
      this.itemsContainer.append(item);
    });
  };

  renderState = () => {
    if (!this.curPageNumField || !this.pagesQtyField || !this.itemsQtyField)
      return;
    this.curPageNumField.textContent = this.curPage.toString();
    this.pagesQtyField.textContent = this.pagesQty.toString();
    this.itemsQtyField.textContent = this.totalItemsQty.toString();
    this.renderPaginationBtns;
  };

  renderPaginationBtns = () => {
    if (this.pagesQty === 1) {
      this.prevPageBtn?.classList.add('btn_inactive');
      this.nextPageBtn?.classList.add('btn_inactive');
    } else if (this.curPage === this.pagesQty) {
      this.prevPageBtn?.classList.remove('btn_inactive');
      this.nextPageBtn?.classList.add('btn_inactive');
    } else if (this.curPage === 1) {
      this.prevPageBtn?.classList.add('btn_inactive');
      this.nextPageBtn?.classList.remove('btn_inactive');
    } else {
      this.prevPageBtn?.classList.remove('btn_inactive');
      this.nextPageBtn?.classList.remove('btn_inactive');
    }
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
