import React from 'react'
import { Row, Col, Card, Avatar } from 'antd';
import md5 from 'js-md5'
import {Context} from '../App';


class UserProfile extends React.Component {

	get_gravatar_url = (email) => {
		const hash=md5(email)
		return("https://www.gravatar.com/avatar/".concat(hash))
	}
	render() {
		return (
			<div>
				<Context.Consumer>
					{(context) => (
						<Row>
							<Col span={18} push={6}>
								col-18 col-push-6
							</Col>
							<Col span={6} pull={18}>
								<Avatar size={64} src={this.get_gravatar_url(context.state.email)}></Avatar>
							</Col>
						</Row>
					)}
				</Context.Consumer>
			</div>
		)
	}
}
export default UserProfile
