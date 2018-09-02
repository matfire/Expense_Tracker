import React from 'react';
import InletTable from '../components/inlets';
import axios from 'axios'

class InletList extends React.Component {
	state = {
		data : []
	}

	componentDidMount() {
		axios.get('http://127.0.0.1:8000/api/budget/inlet/').then( (res) => {
			this.setState({data:res.data})
		}
		)
	}

	render() {
		return <InletTable data={this.state.data}/>
	}
}

export default InletList;