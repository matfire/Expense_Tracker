import React from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {VictoryPie, VictoryTheme} from 'victory';
import Cookie from 'js-cookie';

class Category_Chart extends React.Component {
	state = {
		data : []
	}

	componentDidMount() {
		console.log(Cookie.get("Authorization"))
		axios.get("http://www.mindyourbudgetapi.matteogassend.com/api/budget/category/chart/", {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then(res => {this.setState({data: res.data})})
	}
	render() {
		return(
			<Card title="Frequently Used Categories" style={{width:300}}>
				<VictoryPie data={this.state.data} colorScale="warm" innerRadius="80" theme={VictoryTheme.material} />
			</Card>
		)
	}
}

export default Category_Chart;