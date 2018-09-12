import React from "react";
import axios from 'axios';
import Cookie from 'js-cookie';


import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post("https://www.mindyourbudgetapi.matteogassend.com/api-token-auth/", values).then(res=>{
          Cookie.set("Authorization", "Token " + res.data.token)
          this.props.handleSubmit();
          this.props.history.push("/");
        }).catch(error => console.log(error));
      }

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Form onSubmit={this.handleSubmit} className="login-form" method="post">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="username" id="id_username"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" name="password" id="id_password"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default Login;