import React from 'react';
import axios from 'axios';
import ExpenseCategory from '../components/expense_category';


class ExpenseCategoryList extends React.Component {

	state = {
		"categories" : []
	}

	componentDidMount() {
		axios.get("http://127.0.0.1:8000/api/budget/category/").then(res => {
			this.setState({
				categories : res.data
			})
		})
	}
	render() {
		return (
			<ExpenseCategory data={this.state.categories}/>
		)
	}
}

export default ExpenseCategoryList;
