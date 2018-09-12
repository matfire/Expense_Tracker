import React from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {VictoryBar, VictoryChart} from 'victory';
import Cookie from 'js-cookie';

class Inlet_Chart extends React.Component {
	state = {
		data : []
	}

	componentDidMount() {
		axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/inlet/chart/", {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then(res => {this.setState({data: res.data})})
	}

	render() {
		return(
			<Card title="Inlets throughout the year" style={{width:300}}>
			<VictoryChart>
				<VictoryBar data={this.state.data} x="month" y="amount" colorScale="warm"/>
			</VictoryChart>
			</Card>
		)
	}
}

export default Inlet_Chart;