import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { MicroAppWithMemoHistory } from 'umi';

export default () => {

  const [, , name, ...url] = location.pathname.split('/');
  return (
    <PageHeaderWrapper
      title={"由Qiankun微前端引擎驱动！"}
      style={{ margin: "0 auto", width: "100%", maxWidth: "960px" }}
    >
      <MicroAppWithMemoHistory name={name} url={`/${url.join('/')}`} />

    </PageHeaderWrapper>
  );
};
