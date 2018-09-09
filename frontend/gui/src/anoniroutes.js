import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from "./components/Login";

import HomePage from './containers/HomePage';

const AnonymousRouter = (props) => {
	const handleSubmit = () => {
		props.update()
	}
	return (
	<div>
		<Switch>
		<Route exact path='/login' render={(props) => <Login {...props} handleSubmit={handleSubmit}/>} />
		<Route exact path='/' component={HomePage} />
	<Route render={() => { return(<Redirect to="/"/>)}}/>
		</Switch>
	</div>
	)
}

export default AnonymousRouter;