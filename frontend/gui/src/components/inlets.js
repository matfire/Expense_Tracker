import React from 'react';

import { Table } from 'antd';
import CollectionsPage from './inlet_add_form';


const InletTable = (props) => {
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'value',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    }
  ]
  const getRowKey = (record) => {
    return record.id
  }

  return (
      <div>
        <CollectionsPage update={props.update}/>
        <Table columns={columns} dataSource={props.data} rowKey={getRowKey}/>
      </div>
    );
}

export default InletTable;