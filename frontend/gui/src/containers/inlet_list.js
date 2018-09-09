import React from 'react';
import InletTable from '../components/inlets';
import axios from 'axios'
import Cookie from 'js-cookie';
class InletList extends React.Component {
	state = {
		data : []
	}

	componentDidMount() {
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = 'X-CSRFToken'
		axios.get('http://127.0.0.1:8000/api/budget/inlet/', {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then( (res) => {
			this.setState({data:res.data})
		}
		)
	}
	handleUpdate = () => {
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = 'X-CSRFToken'
		axios.get("http://127.0.0.1:8000/api/budget/category/", {
			headers : {"Authorization" : Cookie.get("Authorization")}
		}).then(res => {
			this.setState({
				data : res.data
			})
		})
	}

	render() {
		return <InletTable data={this.state.data} update={this.handleUpdate}/>
	}
}

export default InletList;