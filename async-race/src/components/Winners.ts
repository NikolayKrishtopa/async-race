import {
  CarType,
  QueryParams,
  WinnerType,
  WinnersQueryParams,
} from '../types/models';

import { Section } from './Section';

export default class Winners extends Section {
  constructor(
    getItems: (
      params: QueryParams | WinnersQueryParams
    ) => Promise<{ items: Array<CarType | WinnerType>; totalQty: string }>,
    generateItem: (item: CarType | WinnerType) => HTMLElement,
    createItem: (item: CarType | WinnerType) => Promise<CarType | WinnerType>,
    fetchDeleteItem: (id: number) => Promise<CarType | WinnerType>
  ) {
    super(getItems, generateItem, createItem, fetchDeleteItem);
  }
}
