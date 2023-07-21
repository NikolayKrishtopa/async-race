import { CarType, QueryParams } from '../../types/models';
import carsApi from '../api';

const getCars = async (params: QueryParams) => {
  const res: { items: CarType[]; totalQty: string } = await carsApi.getCars(
    params
  );

  return res;
};

export default getCars;
