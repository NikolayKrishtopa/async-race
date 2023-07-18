export interface CarModel {
  id: string;
  name: string;
  cyrillicName: string;
  class: string;
  yearFrom: number;
  yearTo: number | null;
}

export interface Car {
  id: string;
  name: string;
  cyrillicName: string;
  popular: boolean;
  country: string;
  models: Array<CarModel>;
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
  id = 'id',
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
}

export interface WinnersQueryParams extends QueryParams {
  _sort: SortBy;
  _order: OrderType;
}

export type WinnerType = {
  id?: number;
  time: number;
  wins: number;
};
