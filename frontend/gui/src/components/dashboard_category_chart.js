import React from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {Context} from '../App'
import {VictoryPie, VictoryTheme} from 'victory';
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts'
import Cookie from 'js-cookie';

class Category_Chart extends React.Component {
	setColors = (data) => {
		let result = []
		data.map(instance => {
			result = [...result, instance.color]
		})
		return result
	}
	render() {
		return(
			<Context.Consumer>
				{(context) => (
			<Card title="Frequently Used Categories">
				<PieChart width={300} height={300}>
					<Pie
          					data={context.state.inlet_categories}
          					cx={120}
					        cy={200}
          					innerRadius={60}
          					outerRadius={80}
          					fill="#8884d8"
          					paddingAngle={3}
        				>
        				{
          					context.state.inlet_categories.map((entry, index) => <Cell fill={this.setColors(context.state.inlet_categories)[index % this.setColors(context.state.inlet_categories).length]}/>)
          				}
        				</Pie>
					<Tooltip />
				</PieChart>
			</Card>)}
			</Context.Consumer>
		)
	}
}

export default Category_Chart;
