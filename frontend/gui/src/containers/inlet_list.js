import React from 'react';
import InletTable from '../components/inlets';
import axios from 'axios'
import Cookie from 'js-cookie';
import {Spin, message} from 'antd';
import {Context} from '../App'
class InletList extends React.Component {

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
