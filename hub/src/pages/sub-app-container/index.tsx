import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { getMasterOptions, MicroAppWithMemoHistory } from 'umi';

interface IOptions {
  apps?: Array<{
    name: string;
    entry: string;
  }>;
  [key: string]: any;
}

export default () => {
  const options: IOptions = getMasterOptions();

  const [, , name, ...url] = location.pathname.split('/');

  const realURL = options.apps?.find(app => app.name == name)?.entry;
  return (
    <PageHeaderWrapper
      title={`由Qiankun微前端引擎驱动！应用地址: ${realURL}`}
      style={{ margin: "0 auto", width: "100%", maxWidth: "960px" }}
    >
      <MicroAppWithMemoHistory name={name} url={`/${url.join('/')}`} />
    </PageHeaderWrapper>
  );
};
