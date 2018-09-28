import React from 'react';
import { Form, Input, Tooltip, Icon, Button, message } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
	state = {
	  confirmDirty: false,
	};

	handleSubmit = (e) => {
	  e.preventDefault();
	  this.props.form.validateFieldsAndScroll((err, values) => {
		if (!err) {
			axios.post("https://www.mindyourbudgetapi.matteogassend.com/rest-auth/registration/", values).then(res => {
				this.props.handleRegister()
				this.props.history.push("/");
			}
			).catch(error => {
				if (error.response) {
					if (error.response.data["email"]) {
						message.error(error.response.data["email"])
					}
					if (error.response.data["password1"]) {
						message.error(error.response.data["password1"])
					}
					if (error.response.data["username"]) {
						message.error(error.response.data["username"])
					}
				}
			}

			)
		}
	  });
	}

	handleConfirmBlur = (e) => {
	  const value = e.target.value;
	  this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	compareToFirstPassword = (rule, value, callback) => {
	  const form = this.props.form;
	  if (value && value !== form.getFieldValue('password1')) {
		callback('Two passwords that you enter is inconsistent!');
	  } else {
		callback();
	  }
	}

	validateToNextPassword = (rule, value, callback) => {
	  const form = this.props.form;
	  if (value && this.state.confirmDirty) {
		form.validateFields(['password2'], { force: true });
	  }
	  callback();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;

		const formItemLayout = {
		  labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
		  },
		  wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 },
		  },
		};
		const tailFormItemLayout = {
		  wrapperCol: {
			xs: {
			  span: 24,
			  offset: 0,
			},
			sm: {
			  span: 16,
			  offset: 8,
			},
		  },
		};

		return (
		  <Form onSubmit={this.handleSubmit}>
			<FormItem
			  {...formItemLayout}
			  label="E-mail"
			>
			  {getFieldDecorator('email', {
				rules: [{
				  type: 'email', message: 'The input is not valid E-mail!',
				}, {
				  required: true, message: 'Please input your E-mail!',
				}],
			  })(
				<Input type="email" name="email" id="id_email"/>
			  )}
			</FormItem>
			<FormItem
			  {...formItemLayout}
			  label="Password"
			>
			  {getFieldDecorator('password1', {
				rules: [{
				  required: true, message: 'Please input your password!',
				}, {
				  validator: this.validateToNextPassword,
				}],
			  })(
				<Input type="password" name="password1" id="id_password1"/>
			  )}
			</FormItem>
			<FormItem
			  {...formItemLayout}
			  label="Confirm Password"
			>
			  {getFieldDecorator('password2', {
				rules: [{
				  required: true, message: 'Please confirm your password!',
				}, {
				  validator: this.compareToFirstPassword,
				}],
			  })(
				<Input type="password" onBlur={this.handleConfirmBlur} name="password2" id="id_password2"/>
			  )}
			</FormItem>
			<FormItem
			  {...formItemLayout}
			  label={(
				<span>
				  Nickname&nbsp;
				  <Tooltip title="What do you want others to call you?">
					<Icon type="question-circle-o" />
				  </Tooltip>
				</span>
			  )}
			>
			  {getFieldDecorator('username', {
				rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
			  })(
				<Input name="username" id="id_username"/>
			  )}
			</FormItem>
			<FormItem {...tailFormItemLayout}>
			  <Button type="primary" htmlType="submit">Register</Button>
			</FormItem>
		  </Form>
		);
	  }
	}

	const RegisterForm = Form.create()(RegistrationForm);

	export default RegisterForm;
