import React from 'react'
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubMenu = Menu.SubMenu;

class SideMenu extends React.Component {
	state = {
	  collapsed : false,
	}

	static propTypes = {
		location: PropTypes.object.isRequired
	}
	onCollapse = (collapsed) => {
	  this.setState({collapsed})
	}
  
	render() {
    const { location } = this.props;
    console.log(location.pathname);
		return (
          <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>Budget</span></span>}
            >
              <Menu.Item key="/budget/category"><NavLink to="/budget/category">Category</NavLink></Menu.Item>
              <Menu.Item key="/budget/inlets"><NavLink to="/budget/inlets">Inlet</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
		);
	}
  }

  export default withRouter(SideMenu);