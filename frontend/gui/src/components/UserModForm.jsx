import React from 'react';
import {Form, Input, Button, message} from 'antd'
import {Context} from '../App';
import axios from 'axios'
import Cookie from 'js-cookie'



const FormItem = Form.Item;

class UserModForm extends React.Component {

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				axios.post('https://mindyourbudgetapi.matteogassend.com/api/users/mod/', values, {
					headers: {"Authorization" : Cookie.get("Authorization")}
				})
				.then(
					res => {
						this.props.update()
						message.success("Profile Updated")
					}
				)
				.catch(err => console.log(err))
			}
		});
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
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
								label="Username"
							>
								{getFieldDecorator('username', {
									rules: [{
										required: true, message: 'Please input your E-mail!',
									}],
									initialValue : this.props.username
								})(
							            <Input />
							          )}
							  </FormItem>
							  <FormItem
								  {...formItemLayout}
								  label="First Name"
							  >
								  {getFieldDecorator('first_name', {
									  initialValue : this.props.first_name
								  })(
								      <Input />
								    )}
							    </FormItem>
							    <FormItem
								    {...formItemLayout}
								    label="Last Name"
							    >
								    {getFieldDecorator('last_name', {
									    initialValue : this.props.last_name
								    })(
									<Input />
								      )}
							      </FormItem>
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
									initialValue : this.props.email
								})(
							            <Input />
							          )}
							  </FormItem>
							  <FormItem
							          {...formItemLayout}
							          label="Password"
							        >
							          {getFieldDecorator('password', {
							            rules: [{
							              required: false, message: 'Please input your password!',
							            }, {
							              validator: this.validateToNextPassword,
							            }],
							          })(
							            <Input type="password" />
							          )}
							        </FormItem>
							        <FormItem
							          {...formItemLayout}
							          label="Confirm Password"
							        >
							          {getFieldDecorator('confirm', {
							            rules: [{
							              required: false, message: 'Please confirm your password!',
							            }, {
							              validator: this.compareToFirstPassword,
							            }],
							          })(
							            <Input type="password" onBlur={this.handleConfirmBlur} />
							          )}
							        </FormItem>
							  <FormItem
								  {...tailFormItemLayout}>
								  <Button type="primary" htmlType="submit">Register</Button>
							</FormItem>
						</Form>
		)
	}
}
const ModForm = Form.create()(UserModForm)

export default ModForm
