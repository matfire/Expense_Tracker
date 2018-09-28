import React from 'react';
import axios from 'axios';
import ExpenseCategory from '../components/expense_category';
import Cookie from 'js-cookie';
import {Form, Button, Modal, Input, Spin, message} from 'antd';
import {Context} from '../App'


const FormItem = Form.Item;

const FormExpense = Form.create()(
class ExpenseCategoryCreate extends React.Component {
	render() {
		const { visible, onCancel, onCreate, form } = this.props;
		const { getFieldDecorator } = form;
		return (
		  <Modal
			visible={visible}
			title="Create a new collection"
			okText="Create"
			onCancel={onCancel}
			onOk={onCreate}
		  >
			<Form layout="vertical">
			  <FormItem label="Title">
				{getFieldDecorator('name', {
				  rules: [{ required: true, message: 'Please input the name of the category!' }],
				})(
							<Input name="name" id="id_name"/>
						)}
			  		</FormItem>
				</Form>
			</Modal>
		);
	}
})

class ExpenseCategoryCreateForm extends React.Component {
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
		axios.post("https://www.mindyourbudgetapi.matteogassend.com/api/budget/category/", values, {
			headers: {"Authorization" : Cookie.get("Authorization")}
		})
		form.resetFields();
		this.setState({ visible: false });
		this.props.update()
		});
	}
	saveFormRef = (formRef) => {
		this.formRef = formRef;
	}

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.showModal}>New Category</Button>
				<FormExpense
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
				/>
			</div>
		);
	}
}
class ExpenseCategoryList extends React.Component {
	render() {
		return (
			<Context.Consumer>
				{(context) => (
					<div>
					<ExpenseCategory data={context.state.inlets_categories}/>
					<ExpenseCategoryCreateForm update={context.state.updateInletsCategories}/>
					</div>
					)}
			</Context.Consumer>
		)
	}
}

export default ExpenseCategoryList;
