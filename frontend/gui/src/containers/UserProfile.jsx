import React from 'react'
import { Row, Col, Card, Avatar } from 'antd';
import md5 from 'js-md5'
import {Context} from '../App';
import ModForm from '../components/UserModForm'


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
								<Card>
									<ModForm email={context.state.email}
										 username={context.state.username}
										 first_name={context.state.first_name}
										 last_name={context.state.last_name}
										 update={context.state.updateState}/>
								</Card>
							</Col>
							<Col span={6} pull={18}>
								<Card>
									<Avatar size={64} src={this.get_gravatar_url(context.state.email)}></Avatar>
									<p>{context.state.first_name} {context.state.last_name}</p>
								</Card>
							</Col>
						</Row>
					)}
				</Context.Consumer>
			</div>
		)
	}
}
export default UserProfile
