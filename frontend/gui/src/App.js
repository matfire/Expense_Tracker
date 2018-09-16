import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import AnonymousRouter from './anoniroutes';
import 'antd/dist/antd.css'
import CustomLayout from './containers/layout';
import LandingPage from './containers/landingPage';
import Cookie from 'js-cookie';
import axios from 'axios'


class App extends Component {
	state = {
		"logged_in" : false,
		"email" : "",
		"username": ""
	}
	handleSubmit = () => {
		const token = Cookie.get("Authorization").slice(6)
		axios.post("https://mindyourbudgetapi.matteogassend.com/get_user/", {"token" : token}).then(res => {
			const email = res.data["user"].email
			const username = res.data["user"].username
			this.setState(
				{
					logged_in:true,
					email:email,
					username:username
				})})
	}
	componentDidMount() {
		if (Cookie.get("Authorization") !== undefined)
			this.handleSubmit()
		else {
			this.setState({logged_in:false})
		}
	}

	render() {
		const content = (this.state.logged_in === true) ?
		<Router>
			<CustomLayout email={this.state.email} username={this.state.username}>
				<BaseRouter />
			</CustomLayout>
		</Router> :
		<Router>
			<LandingPage>
				<AnonymousRouter update={this.handleSubmit} />
			</LandingPage>
		</Router>
		return (
			<div className="App">
			{content}
			</div>
		);
	}
}

export default App;
