import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';

import MyHeader from './common/MyHeader';
import MyFooter from './common/MyFooter';
import MyLeftSider from './common/LeftSider';

const { Header, Footer, Content } = Layout;

class DefaultLayout extends React.Component {
  render() {
    // const { hasLeftSider } = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ height: 'auto', padding: '0' }}>
          <MyHeader />
        </Header>
        <Layout>
          <MyLeftSider />
          <Content>{this.props.children}</Content>
        </Layout>
        <Footer style={{ padding: '0' }}>
          <MyFooter />
        </Footer>
      </Layout>
    );
  }
}

function mapStateToProps({ app }) {
  return {
    ...app,
  };
}

export default connect(mapStateToProps)(DefaultLayout);
