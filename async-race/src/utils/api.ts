import { BASE_URL, ENDPOINTS } from './urlConstants';
import {
  Car,
  ENGINE_STATUS,
  OrderType,
  QueryParams,
  REQUEST_TYPES,
  SortBy,
  WinnerType,
  WinnersQueryParams,
} from '../types/models';

const carsApi = {
  async helper(url: string, method: REQUEST_TYPES, payload?: object) {
    try {
      const res = await fetch(BASE_URL + url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: payload ? JSON.stringify(payload) : null,
      });

      const parsed = await res.json();
      return { payload: parsed, totalQty: res.headers.get('X-Total-Count') };
    } catch (err) {
      console.log(err);
    }
  },

  async getCars(params: QueryParams = { _page: 1, _limit: 600 }) {
    const paramsFormated = new URLSearchParams({
      _page: params._page.toString(),
      _limit: params._limit.toString(),
    });
    const endpoint = `${ENDPOINTS.GARAGE}?${paramsFormated}`;
    const res = await this.helper(endpoint, REQUEST_TYPES.GET);
    const items = res?.payload as Array<Car>;
    const totalQty = res?.totalQty as string;
    return { items, totalQty };
  },

  async getCar(id: number) {
    const endpoint = `${ENDPOINTS.GARAGE}/${id}`;
    return this.helper(endpoint, REQUEST_TYPES.GET);
  },

  async createCar(payload: object) {
    return this.helper(ENDPOINTS.GARAGE, REQUEST_TYPES.POST, payload);
  },

  async deleteCar(id: number) {
    const endpoint = `${ENDPOINTS.GARAGE}/${id}`;
    return this.helper(endpoint, REQUEST_TYPES.DELETE);
  },

  async updateCar(id: number, payload: object) {
    const endpoint = `${ENDPOINTS.GARAGE}/${id}`;
    return this.helper(endpoint, REQUEST_TYPES.PUT, payload);
  },

  async changeEngineStatus(id: number, status: ENGINE_STATUS) {
    const params = new URLSearchParams({
      id: id.toString(),
      status,
    });
    const endpoint = `${ENDPOINTS.ENGINE}?${params}`;
    return this.helper(endpoint, REQUEST_TYPES.PATCH);
  },

  async startEngine(id: number) {
    return this.changeEngineStatus(id, ENGINE_STATUS.STARTED);
  },

  async stopEngine(id: number) {
    return this.changeEngineStatus(id, ENGINE_STATUS.STOPPED);
  },

  async drive(id: number) {
    return this.changeEngineStatus(id, ENGINE_STATUS.DRIVE);
  },

  async getWinners(
    params: WinnersQueryParams = {
      _page: 1,
      _limit: 7,
      _sort: SortBy.time,
      _order: OrderType.descending,
    }
  ) {
    const paramsFormated = new URLSearchParams({
      _page: params._page.toString(),
      _limit: params._limit.toString(),
      _sort: params._sort,
      _order: params._order,
    });
    const endpoint = `${ENDPOINTS.WINNERS}?${paramsFormated}`;
    const res = await this.helper(endpoint, REQUEST_TYPES.GET);
    const items = res?.payload as Array<WinnerType>;
    const totalQty = res?.totalQty as string;
    return { items, totalQty };
  },

  async getWinner(id: number) {
    const endpoint = `${ENDPOINTS.WINNERS}?${id}`;
    return this.helper(endpoint, REQUEST_TYPES.GET);
  },

  async createWinner(payload: WinnerType) {
    return this.helper(ENDPOINTS.WINNERS, REQUEST_TYPES.POST, payload);
  },

  async deleteWinner(id: number) {
    const endpoint = `${ENDPOINTS.WINNERS}?${id}`;
    return this.helper(endpoint, REQUEST_TYPES.DELETE);
  },

  async editWinner(id: number, payload: WinnerType) {
    const endpoint = `${ENDPOINTS.WINNERS}?${id}`;
    return this.helper(endpoint, REQUEST_TYPES.POST, payload);
  },
};

export default carsApi;
