import React from 'react'
import {Route} from 'react-router-dom'

import ExpenseCategoryList from './containers/expense_category_list';
import InletList from './containers/inlet_list';

const BaseRouter = () => {
	return (
	<div>
		<Route exact path='/budget/category' component={ExpenseCategoryList} />
		<Route exact path='/budget/inlets' component={InletList} />
	</div>
	)
}

export default BaseRouter;