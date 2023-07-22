import { CarType, QueryParams, WinnerType } from '../types/models';

import { Section } from './Section';

export default class Winners extends Section<WinnerType> {
  constructor(
    getItems: (
      params: QueryParams | QueryParams
    ) => Promise<{ items: Array<WinnerType>; totalQty: string }>,
    generateItem: (item: WinnerType) => HTMLElement,
    createItem: (item: WinnerType) => Promise<WinnerType>,
    fetchDeleteItem: (id: number) => Promise<WinnerType>,
    fetchEditItem: (id: number, payload: WinnerType) => Promise<WinnerType>
  ) {
    super(getItems, generateItem, createItem, fetchDeleteItem, fetchEditItem);
  }

  renderLayout = () => {
    super.renderLayout('Winners');
  };
}
