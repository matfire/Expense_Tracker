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
    }
  ]
  const getRowKey = (record) => {
    return record.name
  }
  
  return (
      <div>
        <CollectionsPage />
        <Table columns={columns} dataSource={props.data} rowKey={getRowKey}/>
      </div>
    );
}

export default InletTable;