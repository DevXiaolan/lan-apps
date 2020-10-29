import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { MicroAppWithMemoHistory } from 'umi';

export default () => {
  const [,, name, ...url] = location.pathname.split('/');
  return (
    <PageHeaderWrapper>
      <MicroAppWithMemoHistory  name={name} url={`/${url.join('/')}`} />
    </PageHeaderWrapper>
  );
};
