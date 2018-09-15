import { Button, Modal, Form, Input, Select, Alert, message } from 'antd';
import { DatePicker } from 'antd';

import React from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
  class extends React.Component {
	  state = {
		  categories : []
	  }
	componentDidMount() {
		// axios.defaults.xsrfCookieName = 'csrftoken'
		// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
		axios.get("https://www.mindyourbudgetapi.matteogassend.com/api/budget/category/", {
      headers : {"Authorization" : Cookie.get("Authorization")}

    }).then(res => {this.setState({categories:res.data})}).catch(res=>console.log(res))
	}


    render() {
      const { visible, onCancel, onCreate, form } = this.props;
	  const { getFieldDecorator } = form;
	  const Option = Select.Option
	  const Options = this.state.categories.map((item) =>
		<Option value={item.id} key={item.id}>{item.name}</Option>
	)
      return (
        <Modal
          visible={visible}
          title="Add a new Inlet"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="name" id="id_name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input a title for the inlet' }],
              })(
                <Input name="name" id="id_name"/>
              )}
            </FormItem>
            <FormItem label="description" id="id_description">
              {getFieldDecorator('description', {
                rules : [{required:true, message: 'Please input a description'}],
              })(<Input name="description" id="id_description"/>)}
            </FormItem>
			<FormItem label="value" id="id_value">
			  {getFieldDecorator('value', {
          rules: [{required:true, message: 'Please input an inlet value'}],
        })(<Input type="number" name="value" id="id_value"/>)}
			</FormItem>
			<FormItem label="category" id="id_category">
			  {getFieldDecorator("category", {
          rules: [{required:true, message: 'Please select a category'}]
        })(<Select id="id_category">
				  {Options}
			  </Select>)}
			</FormItem>
      <FormItem label="date" id="id_date">
        <p>If you leave this blank, it will automatically be set to today</p>
        {getFieldDecorator("date")(<DatePicker/>)}
      </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
    axios.post("https://www.mindyourbudgetapi.matteogassend.com/api/budget/inlet/add/", values, {
      headers : {"Authorization" : Cookie.get("Authorization")}
    }).then( res => {
        this.props.update();
	message.success("Inlet added correctly")
    })
      form.resetFields();
	  this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }



  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Add Inlet</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;
