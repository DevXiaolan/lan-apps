import { getApps } from '@/services';
import { RocketOutlined } from '@ant-design/icons';
import {
  BasicLayout as ProLayoutComponents,
  BasicLayoutProps as ProLayoutComponentsProps,
  MenuDataItem,
} from '@ant-design/pro-layout';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, qiankunStart } from 'umi';

export interface BasicLayoutProps
  extends ProLayoutComponentsProps {
  sideBar: MenuDataItem[];
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: object;
  siteConfig: object;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [menus, setMenu] = useState<MenuDataItem[]>([]);
  const { children } = props;

  useEffect(() => {
    getApps().then(apps => {
      setMenu(apps.map(app => ({
        path: `/app/${app.name}`,
        name: app.name,
      })));
    })
    qiankunStart();
    console.log('Qiankun started');
  }, []);

  return menus.length ? (
    <ProLayoutComponents
      logo={false}
      menuHeaderRender={false}
      menuItemRender={(menuItemProps, defaultDom) => {
        return (
          <Link
            to={menuItemProps.path as string}
          >
            <RocketOutlined />{defaultDom}
          </Link>
        );
      }}
      menuDataRender={() => {
        console.log('Final Menu', menus);
        return menus
      }}
      navTheme="light"
      layout="top"
    >
      {children}
    </ProLayoutComponents>
  ) : <Spin />;
};


export default BasicLayout;
