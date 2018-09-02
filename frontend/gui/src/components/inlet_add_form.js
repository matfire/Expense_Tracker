import { Button, Modal, Form, Input, Select } from 'antd';
import React from 'react';
import axios from 'axios';
import CSRFToken from '../csrf'
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
	  state = {
		  categories : []
	  }
	componentDidMount() {
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = 'X-CSRFToken'
		axios.get("http://127.0.0.1:8000/api/budget/category/").then(res => {this.setState({categories:res.data})})
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
		  	<CSRFToken />
            <FormItem label="name" id="id_name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input name="name" id="id_name"/>
              )}
            </FormItem>
            <FormItem label="description" id="id_description">
              {getFieldDecorator('description')(<Input name="description" id="id_description"/>)}
            </FormItem>
			<FormItem label="value" id="id_value">
			  {getFieldDecorator('value')(<Input type="number" name="value" id="id_value"/>)}
			</FormItem>
			<FormItem label="category" id="id_category">
			  <Select id="id_category">
				  {Options}
			  </Select>
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

	  console.log('Received values of form: ', values);
	  axios.post("http://127.0.0.1:8000/api/budget/inlet/add/", values).then( res => {console.log(res)})
      form.resetFields();
	  this.setState({ visible: false });
	  //window.location.reload()
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