import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

import { injectColumns } from '@/common/utils/function';

const tableConfig = [
  { dataIndex: 'name', title: '产品名称' },
  { dataIndex: 'category', title: '分类' },
  { dataIndex: 'operation', title: '操作' },
];

class ProductList extends Component {
  static defaultProps = {
    text: '',
  };

  get columns() {
    return injectColumns(tableConfig, {
      operation: {
        render: (text, record) => {
          return (
            <Popconfirm title="Delete?" onConfirm={() => this.props.onDelete(record.id)}>
              <Button>Delete</Button>
            </Popconfirm>
          );
        },
      },
    });
  }

  render() {
    const { products } = this.props;
    return <Table dataSource={products} columns={this.columns} />;
  }
}
ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
