import { getApps } from '@/services';
import {
  BasicLayout as ProLayoutComponents,
  BasicLayoutProps as ProLayoutComponentsProps,
  MenuDataItem,
} from '@ant-design/pro-layout';
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

  return (
    <ProLayoutComponents
      logo={false}
      menuHeaderRender={false}
      menuItemRender={(menuItemProps, defaultDom) => {
        return (
          <Link to={menuItemProps.path as string}>
            {defaultDom}
          </Link>
        );
      }}
      menuDataRender={() => menus}
      navTheme="light"
      layout="topmenu"
    >
      {children}
    </ProLayoutComponents>
  );
};


export default BasicLayout;
