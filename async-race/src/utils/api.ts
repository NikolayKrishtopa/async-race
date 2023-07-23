import { BASE_URL, ENDPOINTS } from './urlConstants';
import {
  CarType,
  ENGINE_STATUS,
  OrderType,
  QueryParams,
  REQUEST_TYPES,
  SortBy,
  WinnerType,
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
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.GET);
    const items = res?.payload as Array<CarType>;
    const totalQty = res?.totalQty as string;
    return { items, totalQty };
  },

  async getCar(id: string) {
    const endpoint = `${ENDPOINTS.GARAGE}/${id}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.GET);
    return res?.payload as CarType;
  },

  async createCar(payload: object) {
    const res = await carsApi.helper(
      ENDPOINTS.GARAGE,
      REQUEST_TYPES.POST,
      payload
    );
    return res?.payload;
  },

  async deleteCar(id: string) {
    const endpoint = `${ENDPOINTS.GARAGE}/${id}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.DELETE);
    if (res) return res.payload;
  },

  async editCar(id: string, payload: object) {
    const endpoint = `${ENDPOINTS.GARAGE}/${id}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.PUT, payload);
    return res?.payload;
  },

  async changeEngineStatus(id: string, status: ENGINE_STATUS) {
    const params = new URLSearchParams({
      id,
      status,
    });
    const endpoint = `${ENDPOINTS.ENGINE}?${params}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.PATCH);
    return res?.payload;
  },

  async startEngine(id: string) {
    return carsApi.changeEngineStatus(id, ENGINE_STATUS.STARTED);
  },

  async stopEngine(id: string) {
    return carsApi.changeEngineStatus(id, ENGINE_STATUS.STOPPED);
  },

  async drive(id: string) {
    return carsApi.changeEngineStatus(id, ENGINE_STATUS.DRIVE);
  },

  async getWinners(
    params: QueryParams = {
      _page: 1,
      _limit: 7,
      _sort: SortBy.time,
      _order: OrderType.descending,
    }
  ) {
    const paramsFormated = new URLSearchParams({
      _page: params._page.toString(),
      _limit: params._limit.toString(),
      _sort: params._sort || '',
      _order: params._order || '',
    });
    const endpoint = `${ENDPOINTS.WINNERS}?${paramsFormated}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.GET);
    const items = res?.payload as Array<WinnerType>;
    const totalQty = res?.totalQty as string;
    return { items, totalQty };
  },

  async getWinner(id: string) {
    const endpoint = `${ENDPOINTS.WINNERS}?${id}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.GET);
    return res?.payload;
  },

  async createWinner(payload: WinnerType) {
    const res = await carsApi.helper(
      ENDPOINTS.WINNERS,
      REQUEST_TYPES.POST,
      payload
    );
    return res?.payload;
  },

  async deleteWinner(id: string) {
    const endpoint = `${ENDPOINTS.WINNERS}?${id}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.DELETE);
    if (res) return res.payload;
  },

  async editWinner(id: string, payload: WinnerType) {
    const endpoint = `${ENDPOINTS.WINNERS}?${id}`;
    const res = await carsApi.helper(endpoint, REQUEST_TYPES.POST, payload);
    return res?.payload;
  },
};

export default carsApi;
