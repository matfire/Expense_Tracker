import React from 'react';
import Gravatar from 'react-gravatar'
import {Context} from '../App';
import {Card, Avatar, Row, Col} from 'antd'
import md5 from 'js-md5'
const Meta={Card}
class ProfileHeader extends React.Component {

	get_gravatar_url = (email) => {
		const hash=md5(email)
		return("https://www.gravatar.com/avatar/".concat(hash))
	}

	render() {
		return(
			<div>
			<Context.Consumer>
				{(context) => (
					<Card bordered={false} style={{background : "#001529"}}>
						<Row>
							<Col>
								<Avatar size={64} src={this.get_gravatar_url(context.state.email)} />
							</Col>
							<Col>
								<h3 style={{color:"white"}}>Hi, {context.state.username}</h3>
							</Col>
						</Row>
					</Card> )}
			</Context.Consumer>
			</div>
		)
	}
}

export default ProfileHeader
