import React from 'react';
import {Button} from 'antd';


const HomePage = (props) => {
	return(
		<div>
		<Button type="default" ><a href="/login">Sign In</a></Button>
		<Button type="default" ><a href="/register">Sign Up</a></Button>
		</div>
	)
}

export default HomePage;