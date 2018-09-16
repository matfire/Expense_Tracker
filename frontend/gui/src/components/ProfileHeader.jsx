import React from 'react';
import Gravatar from 'react-gravatar'
import {Card, Avatar} from 'antd'
import md5 from 'js-md5'
const Meta={Card}
class ProfileHeader extends React.Component {

	get_gravatar_url = () => {
		const hash=md5(this.props.email)
		return("https://www.gravatar.com/avatar/".concat(hash))
	}

	render() {
		const title="Hi,".concat(this.props.username)
		return(
			<Card bordered={false} style={{background : "#001529"}}>
				<Avatar size={64} src={this.get_gravatar_url()} />
			</Card>
		)
	}
}

export default ProfileHeader
