import React from 'react';
import { Layout, Menu, Icon } from 'antd';

import styles from './styles.less';

const { Sider } = Layout;

class LeftSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Sider
        className={styles.leftSider}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <Menu mode="inline" defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']}>
          <Menu.SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>

        {/* <div style={{ position: 'absolute' }}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </div> */}
      </Sider>
    );
  }
}

export default LeftSider;
