import React from 'react';
import InletTable from '../components/inlets';
import axios from 'axios'
import Cookie from 'js-cookie';
import {Spin, message} from 'antd';
class InletList extends React.Component {
	state = {
		data : [],
		loading : true
	}

	componentDidMount() {
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = 'X-CSRFToken'
		axios.get('https://www.mindyourbudgetapi.matteogassend.com/api/budget/inlet/', {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then( (res) => {
			this.setState({data:res.data, loading:false})
		}
		)
	}
	handleUpdate = () => {
		this.setState({
			loading: true
		})
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = 'X-CSRFToken'
		axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/category/", {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then(res => {
			this.setState({
				data : res.data,
				loading : false
			})
		})
	}

	render() {
		return (
			<Spin spinning={this.state.loading}>
			<InletTable data={this.state.data} update={this.handleUpdate}/>
			</Spin>
		)
	}
}

export default InletList;
