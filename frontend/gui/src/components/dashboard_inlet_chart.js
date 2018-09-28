import React from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {VictoryBar, VictoryChart} from 'victory';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import Cookie from 'js-cookie';
import {Context} from '../App';

class Inlet_Chart extends React.Component {

	render() {
		return(
			<Context.Consumer>
				{(context) => (
			<Card title="Inlets throughout the year" style={{width:600}}>
				<LineChart width={600} height={300} data={context.state.year_evolution}
	            			margin={{top: 5, right: 30, left: 20, bottom: 5}}>
	       				<XAxis dataKey="month"/>
	       				<YAxis/>
	       				<CartesianGrid strokeDasharray="3 3"/>
	       				<Tooltip/>
	       				<Legend />
	       				<Line type="monotone" dataKey="inlet" stroke="#8884d8" activeDot={{r: 8}}/>
	      </LineChart>
			</Card>)}
			</Context.Consumer>
		)
	}
}

export default Inlet_Chart;
