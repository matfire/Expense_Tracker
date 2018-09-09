import React from 'react';
import { Layout } from 'antd';
import LandingMenu from '../components/landingMenu';
const { Header, Content, Footer } = Layout;

const LandindPage = (props) => {
	return (
	<Layout className="layout">
		<Header >
			<div className="logo" />
			<LandingMenu/>
		</Header>
		<Content>
			<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{props.children}</div>
		</Content>
		<Footer style={{textAlign : "center"}}>
		Mind Your Budget ©2018 Created by Matteo Gassend
		</Footer>
	</Layout>
	)
}


export default LandindPage;