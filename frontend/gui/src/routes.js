import React from 'react'
import {Route} from 'react-router-dom'

import ExpenseCategoryList from './containers/expense_category_list';

const BaseRouter = () => {
	return (
	<div>
		<Route exact path='/budget/category' component={ExpenseCategoryList} />

	</div>
	)
}

export default BaseRouter;