import {Alert} from 'antd';
import React from 'react';
class Allert extends React.Component {
	state = {
		visible: this.props.visible,
	  }
	
	  handleClose = () => {
		this.setState({ visible: false });
	  }
	
	  render() {
		return (
		  <div>
			{
			  this.state.visible ? (
				<Alert
				  message={this.props.message}
				  type={this.props.type}
				  closable
				  afterClose={this.handleClose}
				/>
			  ) : null
			}
			<p>{this.props.content}</p>
		  </div>
		);
	}
}

export default Allert;