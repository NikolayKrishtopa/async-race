export interface CarModel {
  id: string;
  name: string;
  cyrillicName: string;
  class: string;
  yearFrom: number;
  yearTo: number | null;
}

export enum AppModes {
  GARAGE = 'garage',
  WINNERS = 'winners',
}

export interface CarTypeData extends CarType {
  cyrillicName: string;
  popular: boolean;
  country: string;
  models: Array<CarModel>;
}

export interface CarType {
  id: string;
  name: string;
  color: string;
}

export enum REQUEST_TYPES {
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export enum ENGINE_STATUS {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export enum SortBy {
  wins = 'wins',
  time = 'time',
}

export enum OrderType {
  ascending = 'ASC',
  descending = 'DESC',
}

export interface QueryParams {
  _page: number;
  _limit: number;
  _sort?: SortBy;
  _order?: OrderType;
}

export type WinnerType = {
  id: string;
  time: number;
  wins: number;
};

export default interface ISection<T, U> {
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
  fetchCreateItem: (item: T) => void;
  fetchDeleteItem: (id: string) => Promise<T>;
  fetchEditItem: (id: string, payload: T) => Promise<T>;
}

export type TripStatus = {
  velocity?: number;
  distance?: number;
  success?: true;
};
