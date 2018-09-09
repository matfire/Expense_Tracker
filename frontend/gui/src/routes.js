import React from 'react'
import {Route} from 'react-router-dom'
import Login from "./components/Login";

import ExpenseCategoryList from './containers/expense_category_list';
import InletList from './containers/inlet_list';
import Dashboard from './containers/dashboard';

const BaseRouter = () => {
	return (
	<div>
		<Route exact path='/budget/category' component={ExpenseCategoryList} />
		<Route exact path='/budget/inlets' component={InletList} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/' component={Dashboard} />
	</div>
	)
}

export default BaseRouter;