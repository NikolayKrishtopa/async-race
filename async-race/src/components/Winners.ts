import { QueryParams, WinnerType } from '../types/models';
import { APP_SECTIONS } from '../utils/constants';
import SELECTORS from '../utils/selectors';
import Winner from './Winner';

import { Section } from './Section';

export default class Winners extends Section<WinnerType, Winner> {
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
  }

  renderHeading = () => {
    const heading = document.createElement('div');
    heading.classList.add(SELECTORS.WINNERS_HEADING);
    heading.innerHTML = `
        <p class="winner__text winner__text_type_name">Number</p>
        <p class="winner__text winner__text_type_wins">Car</p>
        <p class="winner__text winner__text_type_best-time">Name</p>
        <p class="winner__text winner__text_type_best-time">Wins</p>
        <p class="winner__text winner__text_type_best-time">Best time</p>
    `;
    if (this.itemsContainer) this.itemsContainer.prepend(heading);
  };

  renderLayout = () => {
    super.renderLayout(APP_SECTIONS.WINNERS);
    this.itemsContainer?.classList.add('section__content_type_winner');
  };
  renderItems = () => {
    super.renderItems();
    this.renderHeading();
  };
}
