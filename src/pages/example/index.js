/**
 * title: Example Page
 */
import React, { Component } from "react";
import { connect } from 'dva';
import { withRouter } from "react-router-dom";
import ProductList from './common/ProductList';
import styles from './styles.less';

class Example extends Component {
  static defaultProps = {
    text: ''
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({ type: 'example/init' })
      .then(() => {})
      .finally(() => {});
  };

  handleDelete = id => {
    this.props.dispatch({
      type: 'example/delete',
      payload: id,
    });
  }

  render() {
    const { list } = this.props;
    return (
      <div className={styles.example}>
        <ProductList onDelete={this.handleDelete} products={list} />
      </div>
    );
  }
  componentWillUnmount = () => {};
}

function mapStateToProps({ example }) {
  return {
    list: example.list
  }
}

export default withRouter(connect(mapStateToProps)(Example));
