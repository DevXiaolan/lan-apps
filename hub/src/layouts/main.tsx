import { IApp } from '@/services';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect } from 'react';
import { Link, useModel } from 'umi';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface IProp {
  children: any;
}

export default ({ children }: IProp) => {
  const { apps, load } = useModel('useApps');

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '1000px', margin: '0 auto' }}
    >
      <Sider theme="light" collapsible={false} collapsed={false}>
        <div className="logo" />
        <Menu defaultSelectedKeys={['1']} mode="inline">
          {apps.map((app: IApp) => (
            <Menu.Item key={app.name} icon={<PieChartOutlined />}>
              <Link to={`/${app.name}`}>{app.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
