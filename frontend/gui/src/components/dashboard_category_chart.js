import React from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {VictoryPie, VictoryTheme} from 'victory';
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts'
import Cookie from 'js-cookie';

class Category_Chart extends React.Component {
	state = {
		data : [],
		colors : []
	}
	setColors = (data) => {
		let result = []
		data.map(instance => {
			result = [...result, instance.color]
		})
		return result
	}
	componentDidMount() {
		axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/category/chart/", {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then(res => {
			this.setState(
				{
					data: res.data,
					colors: this.setColors(res.data)
				}
			)})
	}
	render() {
		return(
			<Card title="Frequently Used Categories">
				<PieChart width={300} height={300}>
					<Pie
          					data={this.state.data}
          					cx={120}
					        cy={200}
          					innerRadius={60}
          					outerRadius={80}
          					fill="#8884d8"
          					paddingAngle={3}
        				>
        				{
          					this.state.data.map((entry, index) => <Cell fill={this.state.colors[index % this.state.colors.length]}/>)
          				}
        				</Pie>
					<Tooltip />
				</PieChart>
			</Card>
		)
	}
}

export default Category_Chart;
