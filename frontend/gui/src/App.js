import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import AnonymousRouter from './anoniroutes';
import 'antd/dist/antd.css'
import CustomLayout from './containers/layout';
import LandingPage from './containers/landingPage';
import Cookie from 'js-cookie';
import axios from 'axios'


const Context = React.createContext();


class Provider extends React.Component {
	state = {
		email : "",
		username: "",
		first_name: "",
		last_name: "",
		inlet_categories_chart:[],
		inlets:[],
		inlets_categories:[],
		outlets:[],
		outlet_categories:[],
		year_evolution:[],
		updateState : () => {
			const token = Cookie.get("Authorization").slice(6)
			axios.post("https://mindyourbudgetapi.matteogassend.com/get_user/", {"token" : token}).then(res => {
				const email = res.data["user"].email
				const username = res.data["user"].username
				const first_name = res.data["user"].first_name
				const last_name = res.data["user"].last_name
				this.setState(
					{
						logged_in:true,
						email:email,
						username:username,
						first_name:first_name,
						last_name:last_name
					})})
			this.state.updateCategoryChart()
			this.state.updateBudget()
			this.state.updateInlets()
			this.state.updateInletsCategories()
		},
		updateCategoryChart: () => {
			axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/category/chart/", {
				headers : {"Authorization" : Cookie.get("Authorization")}
			}).then(res => {this.setState({inlet_categories_chart: res.data,})})
		},
		updateBudget: () => {
			axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/inlet/chart/", {
				headers : {"Authorization" : Cookie.get("Authorization")}
			}).then(res => {this.setState({year_evolution: res.data})})
		},
		updateInlets: () => {
			axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/inlet/", {
				headers : {"Authorization" : Cookie.get("Authorization")}}).then(
					res => {
						this.setState({inlets:res.data})
					}
				)
			this.state.updateBudget()
		},
		updateInletsCategories: () => {
			axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/category/", {
				headers : {"Authorization" : Cookie.get("Authorization")}}).then(res => {
					this.setState({inlets_categories:res.data})
				})
			this.state.updateCategoryChart()
		}

	}
	componentDidMount() {
		if (Cookie.get("Authorization") === undefined)
			return
		this.state.updateState()
	}
	render() {
		return(
			<Context.Provider value={{
					state : this.state
				}}>
				{this.props.children}
			</Context.Provider>
		)
	}
}


class App extends Component {
	state = {
		"logged_in" : false,
		"email" : "",
		"username": "",
		"first_name": "",
		"last_name": ""
	}
	handleSubmit = () => {
		const token = Cookie.get("Authorization").slice(6)
		axios.post("https://mindyourbudgetapi.matteogassend.com/get_user/", {"token" : token}).then(res => {
			const email = res.data["user"].email
			const username = res.data["user"].username
			const first_name = res.data["user"].first_name
			const last_name = res.data["user"].last_name
			this.setState(
				{
					logged_in:true,
					email:email,
					username:username,
					first_name:first_name,
					last_name:last_name
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
			<Provider>
				<CustomLayout email={this.state.email} username={this.state.username}>
					<BaseRouter />
				</CustomLayout>
			</Provider>
		</Router> :
		<Router>
			<Provider>
				<Context.Consumer>
				{(context) => (
			<LandingPage>
				<AnonymousRouter update={() => {
						this.handleSubmit()
						context.state.updateState()
					}} />
			</LandingPage>)}
			</Context.Consumer>
			</Provider>
		</Router>
		return (
				<div className="App">
					{content}
				</div>
		);
	}
}

export default App;
export {Context};
