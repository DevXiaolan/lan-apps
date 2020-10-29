import { request } from 'umi';

const BASE = 'http://127.0.0.1:3000';

export interface IApp {
  url: string;
  name: string;
}

export const getApps = async (): Promise<IApp[]> => {
  const { code, data } = await request(`${BASE}/app`, {
    method: 'GET',
  });
  return code === 0 ? data : [];
};