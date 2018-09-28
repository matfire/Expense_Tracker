import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from "./components/Login";
import {message} from 'antd';
import HomePage from './containers/HomePage';
import RegisterForm from './components/RegistrationForm';

const AnonymousRouter = (props) => {
	const handleSubmit = () => {
		props.update()
	}
	const handleRegister = () => {
		message.success("User registered succesfully")
	}
	return (
	<div>
		<Switch>
		<Route exact path='/login' render={(props) => <Login {...props} handleSubmit={handleSubmit}/>} />
		<Route exact path='/register' render={(props) => <RegisterForm {...props} handleRegister={handleRegister} />} />
		<Route exact path='/' component={HomePage} />
	<Route render={() => { return(<Redirect to="/"/>)}}/>
		</Switch>
	</div>
	)
}

export default AnonymousRouter;
