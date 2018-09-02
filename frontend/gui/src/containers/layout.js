import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import SideMenu from '../components/menu';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class CustomLayout extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default CustomLayout;