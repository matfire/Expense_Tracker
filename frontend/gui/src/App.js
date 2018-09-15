import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import AnonymousRouter from './anoniroutes';
import 'antd/dist/antd.css'
import CustomLayout from './containers/layout';
import LandingPage from './containers/landingPage';
import Cookie from 'js-cookie';


class App extends Component {
	state = {
		"logged_in" : false
	}

	componentDidMount() {
		if (Cookie.get("Authorization") !== undefined)
			this.setState({logged_in:true})
		else {
			this.setState({logged_in:false})
		}
	}
	handleSubmit = () => {
		this.setState({logged_in:true})
	}
	render() {
		const content = (this.state.logged_in === true) ?
		<Router>
			<CustomLayout>
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
