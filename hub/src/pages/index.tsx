import React from 'react';
import { MicroAppWithMemoHistory, useParams } from 'umi';

export default () => {
  const { name } = useParams() as { name: string };
  return (
    <>
      <MicroAppWithMemoHistory name={name} url="/" />
    </>
  );
};
