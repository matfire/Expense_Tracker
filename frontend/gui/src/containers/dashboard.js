import React from 'react'
import Category_Chart from '../components/dashboard_category_chart';
import Inlet_Chart from '../components/dashboard_inlet_chart';
import { Row } from 'antd';


class Dashboard extends React.Component {

	render() {
		return(
			<div>
				<Row type="flex" justify="space-around">
				<Category_Chart />
				<Inlet_Chart />
				</Row>
			</div>
		)
	}
}

export default Dashboard;