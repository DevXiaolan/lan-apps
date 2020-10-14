import { useModel } from '@mohism/core';
import { Err加载APP列表失败 } from '../errors/400';

export default async () => {
  const list = await useModel('app').find({}, {
    _id: 0,
  });
  if (list.length === 0) {
    throw Err加载APP列表失败;
  }
  return list;
};