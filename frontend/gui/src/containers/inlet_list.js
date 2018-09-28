import React from 'react';
import InletTable from '../components/inlets';
import axios from 'axios'
import Cookie from 'js-cookie';
import {Spin, message} from 'antd';
import {Context} from '../App'
class InletList extends React.Component {
	state = {
		data : [],
		loading : true
	}

	componentDidMount() {
		axios.get('https://www.mindyourbudgetapi.matteogassend.com/api/budget/inlet/', {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then( (res) => {
			this.setState({data:res.data, loading:false})
		}
		)
	}
	handleUpdate = () => {
		this.setState({
			data : [],
			loading: true
		})
		axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/category/", {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then(res => {
			this.setState({
				data : res.data,
				loading : false
			})
			window.location.reload()
		})
	}

	render() {
		return (
			<Context.Consumer>
				{(context) => (
			<InletTable data={context.state.inlets} update={context.state.updateInlets}/>
			)}
		</Context.Consumer>
		)
	}
}

export default InletList;
