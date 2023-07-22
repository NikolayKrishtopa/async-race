import { QueryParams, WinnerType } from '../types/models';
import { APP_SECTIONS } from '../utils/constants';

import { Section } from './Section';

export default class Winners extends Section<WinnerType> {
  constructor(
    getItems: (
      params: QueryParams | QueryParams
    ) => Promise<{ items: Array<WinnerType>; totalQty: string }>,
    generateItem: (item: WinnerType) => HTMLElement,
    createItem: (item: WinnerType) => Promise<WinnerType>,
    fetchDeleteItem: (id: string) => Promise<WinnerType>,
    fetchEditItem: (id: string, payload: WinnerType) => Promise<WinnerType>
  ) {
    super(getItems, generateItem, createItem, fetchDeleteItem, fetchEditItem);
  }

  renderLayout = () => {
    super.renderLayout(APP_SECTIONS.WINNERS);
  };
}
