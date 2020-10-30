import { getApps } from '@/services';
import { Html5Outlined, RocketOutlined, SmileOutlined, ToolOutlined } from '@ant-design/icons';
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

const getIcon = (name: string | React.ReactNode = '') => {
  switch (name) {
    case 'app':
      return <RocketOutlined />;
    case 'h5':
      return <Html5Outlined />;
    case 'tool':
      return <ToolOutlined />;
    case 'fun':
      return <SmileOutlined />;
  }
  return <RocketOutlined />;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [menus, setMenu] = useState<MenuDataItem[]>([]);
  const { children } = props;

  useEffect(() => {
    getApps().then(apps => {
      setMenu(apps.map(app => ({
        path: `/app/${app.name}`,
        name: app.name,
        icon: app.icon,
      })));
    })
    qiankunStart();
    console.log('Qiankun started');
  }, []);

  return menus.length ? (
    <ProLayoutComponents
      logo={false}
      menuHeaderRender={false}
      menuItemRender={(menuItemProps) => {
        return (
          <Link
            to={menuItemProps.path as string}
          >
            {getIcon(menuItemProps.icon)}<span>{menuItemProps.name}</span>
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
