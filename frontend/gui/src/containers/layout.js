import React from 'react'
import { Layout } from 'antd';
import SideMenu from '../components/menu';

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <SideMenu email={this.props.email} username={this.props.username}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          Mind Your Budget ©2018 Created by Matteo Gassend
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default CustomLayout;
