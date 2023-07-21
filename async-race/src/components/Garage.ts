import { CarType, QueryParams } from '../types/models';

import { Section } from './Section';

export default class Garage extends Section<CarType> {
  constructor(
    getItems: (
      params: QueryParams | QueryParams
    ) => Promise<{ items: Array<CarType>; totalQty: string }>,
    generateItem: (item: CarType) => HTMLElement,
    createItem: (item: CarType) => Promise<CarType>,
    fetchDeleteItem: (id: number) => Promise<CarType>,
    fetchEditItem: (id: number, payload: CarType) => Promise<CarType>
  ) {
    super(getItems, generateItem, createItem, fetchDeleteItem, fetchEditItem);
  }
}
