import { OrderType, QueryParams, SortBy, WinnerType } from '../types/models';
import { APP_SECTIONS } from '../utils/constants';
import SELECTORS from '../utils/selectors';
import Winner from './Winner';
import arrowImg from '../assets/img/up_arrow.svg';

import { Section } from './Section';
import APP_ADJUSTMENT from '../utils/AppAdjust';

export default class Winners extends Section<WinnerType, Winner> {
  sortPerTimeBtn: HTMLButtonElement | null;
  sortPerWinBtn: HTMLButtonElement | null;
  sortBy: SortBy;
  order: OrderType;
  sortbyWinsIcon: HTMLImageElement | null;
  sortbyTimeIcon: HTMLImageElement | null;

  constructor(
    getItems: (
      params: QueryParams | QueryParams
    ) => Promise<{ items: Array<WinnerType>; totalQty: string }>,
    generateItem: (item: WinnerType) => Winner,
    createItem: (item: WinnerType) => Promise<WinnerType>,
    fetchDeleteItem: (id: string) => Promise<WinnerType>,
    fetchEditItem: (id: string, payload: WinnerType) => Promise<WinnerType>
  ) {
    super(getItems, generateItem, createItem, fetchDeleteItem, fetchEditItem);
    this.itemsPerPage = APP_ADJUSTMENT.ITEMS_PER_PAGE_WINNERS;
    this.sortBy = SortBy.wins;
    this.order = OrderType.descending;
    this.renderPage();
  }

  renderHeading = () => {
    const heading = document.createElement('div');
    heading.classList.add(SELECTORS.WINNERS_HEADING);
    heading.innerHTML = `
        <p class="winner__text">Number</p>
        <p class="winner__text">Car</p>
        <p class="winner__text">Name</p>
        <div class="winner__heading-item">
          <p class="winner__text winner__text_clickable" id="sortByWins">Wins</p>
          <img src=${arrowImg} class="winner__sort-icon winner__sort-icon_type_wins winner__sort-icon_state_hidden"/>
        </div>
        <div class="winner__heading-item">
          <p class="winner__text winner__text_clickable" id="sortByTime">Best time</p>
          <img src=${arrowImg} class="winner__sort-icon winner__sort-icon_type_time winner__sort-icon_state_hidden"/>
        </div>
    `;
    if (this.itemsContainer) this.itemsContainer.prepend(heading);
  };

  findAndInitializeUxElements = () => {
    this.sortPerTimeBtn = document.querySelector(SELECTORS.SORT_BY_TIME_BTN);
    this.sortPerWinBtn = document.querySelector(SELECTORS.SORT_BY_WINS_BTN);
    this.sortbyWinsIcon = document.querySelector(SELECTORS.SORT_BY_WINS_ICON);
    this.sortbyTimeIcon = document.querySelector(SELECTORS.SORT_BY_TIME_ICON);
  };

  renderLayout = () => {
    super.renderLayout(APP_SECTIONS.WINNERS);
    this.itemsContainer?.classList.add('section__content_type_winner');
    this.renderSortState();
  };

  changeSort = (sortBy: SortBy) => {
    if (this.queryParams._sort === sortBy) {
      if (this.queryParams._order === OrderType.ascending) {
        this.order = OrderType.descending;
        this.updateQueryParams();
      } else {
        this.order = OrderType.ascending;
        this.updateQueryParams();
      }
    } else {
      this.sortBy = sortBy;
      this.order = OrderType.descending;
      this.updateQueryParams();
    }
    this.fetchItemsList();
  };

  updateQueryParams = () => {
    super.updateQueryParams();
    this.queryParams._sort = this.sortBy;
    this.queryParams._order = this.order;
  };

  setListeners = () => {
    this.sortPerTimeBtn?.addEventListener('click', () =>
      this.changeSort(SortBy.time)
    );
    this.sortPerWinBtn?.addEventListener('click', () =>
      this.changeSort(SortBy.wins)
    );
  };

  renderSortState = () => {
    if (this.sortBy === SortBy.time) {
      this.sortbyWinsIcon?.classList.add(SELECTORS.WINNER_SORT_ICON_HIDDEN);
      this.sortbyTimeIcon?.classList.remove(SELECTORS.WINNER_SORT_ICON_HIDDEN);
      if (this.order === OrderType.ascending) {
        this.sortbyTimeIcon?.classList.remove(
          SELECTORS.WINNER_SORT_ICON_ROTATED
        );
      } else if (this.order === OrderType.descending) {
        this.sortbyTimeIcon?.classList.add(SELECTORS.WINNER_SORT_ICON_ROTATED);
      }
    } else if (this.sortBy === SortBy.wins) {
      this.sortbyWinsIcon?.classList.remove(SELECTORS.WINNER_SORT_ICON_HIDDEN);
      this.sortbyTimeIcon?.classList.add(SELECTORS.WINNER_SORT_ICON_HIDDEN);
      if (this.order === OrderType.ascending) {
        this.sortbyWinsIcon?.classList.remove(
          SELECTORS.WINNER_SORT_ICON_ROTATED
        );
      } else if (this.order === OrderType.descending) {
        this.sortbyWinsIcon?.classList.add(SELECTORS.WINNER_SORT_ICON_ROTATED);
      }
    } else {
      this.sortbyWinsIcon?.classList.add(SELECTORS.WINNER_SORT_ICON_HIDDEN);
      this.sortbyTimeIcon?.classList.add(SELECTORS.WINNER_SORT_ICON_HIDDEN);
    }
  };

  fetchItemsList = async () => {
    await super.fetchItemsList();
    this.renderSortState();
  };

  renderItems = () => {
    super.renderItems();
    this.renderHeading();
    this.findAndInitializeUxElements();
  };
}
