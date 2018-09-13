import React from 'react';
import {Menu, Icon} from 'antd';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

class LandingMenu extends React.Component {
	state = {
		current: '/',
	  }
	  static propTypes = {
		location: PropTypes.object.isRequired
	}
	  handleClick = (e) => {
		this.setState({
		  current: e.key,
		});
	  }
	
	  render() {
		const { location } = this.props;

		return (
		  <Menu
			onClick={this.handleClick}
			selectedKeys={[location.pathname]}
			mode="horizontal"
			theme="dark"
			style={{ lineHeight: '64px' }}

		  >
			<Menu.Item key="/">
				<NavLink to="/">
					<Icon type="home" />Home
				</NavLink>
			</Menu.Item>
			<Menu.Item key="/login">
				<NavLink to="/login">
					<Icon type="lock" />Login
				</NavLink>
			</Menu.Item>
			<Menu.Item key="/register">
				<NavLink to="/register">
					<Icon type="plus" />Register
				</NavLink>
			</Menu.Item>
		  </Menu>
		);
	  }
}

export default withRouter(LandingMenu);