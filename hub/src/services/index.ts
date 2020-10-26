import request from 'umi-request';

export interface IApp {
  name: string;
  url: string;
}

export const getApps = async (): Promise<IApp[]> => {
  const { code, data } = await request.get('/api/app');
  if (code === 0) {
    return data;
  }
  return [];
};
