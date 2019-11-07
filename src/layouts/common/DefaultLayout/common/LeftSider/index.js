import React from 'react';
import { Layout, Menu, Icon } from 'antd';

import { isObject } from '@/common/utils/function';

import styles from './styles.less';

const { Sider } = Layout;

class MenuPro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMenuOption = data => {
    // 每一层data必须为对象
    if (!isObject(data)) {
      return null;
    } else if (data.type === 'SubMenu') {
      return (
        <Menu.SubMenu
          key={data.key}
          title={
            <span>
              <Icon type={data.icon} />
              <span>{data.title}</span>
            </span>
          }
        >
          {data.children && data.children.map(item => this.getMenuOption(item))}
        </Menu.SubMenu>
      );
    } else if (data.type === 'ItemGroup') {
      return (
        <Menu.ItemGroup key={data.key} title={data.title}>
          {data.children && data.children.map(item => this.getMenuOption(item))}
        </Menu.ItemGroup>
      );
    } else if (data.type === 'Item') {
      return (
        <Menu.Item key={data.key}>
          <Icon type={data.icon} />
          <span>{data.title}</span>
        </Menu.Item>
      );
    }
  };

  render() {
    const { data } = this.props;
    return (
      <Menu
        mode="inline"
        defaultOpenKeys={data.defaultOpenKeys}
        defaultSelectedKeys={data.defaultSelectedKeys}
        onClick={val => {
          console.log(val);
        }}
      >
        {data.children.map(item => this.getMenuOption(item))}
      </Menu>
    );
  }
}

class LeftSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuData: {
        defaultOpenKeys: ['sub1'],
        defaultSelectedKeys: ['1'],
        children: [
          {
            type: 'SubMenu',
            key: 'sub1',
            icon: 'mail',
            title: 'Navigation One',
            children: [
              {
                type: 'ItemGroup',
                key: 'g1',
                title: 'Item 1',
                children: [
                  { type: 'Item', key: '1', icon: 'user', title: 'nav 1' },
                  { type: 'Item', key: '2', icon: 'video-camera', title: 'nav 2' },
                ],
              },
            ],
          },
        ],
      },
    };
  }

  handleToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { menuData } = this.state;
    return (
      <Sider
        className={styles.leftSider}
        trigger={null}
        theme="light"
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.toggle}
      >
        <MenuPro data={menuData} />
        <div className={styles.trigger}>
          <Icon type="more" onClick={this.handleToggle} />
        </div>
      </Sider>
    );
  }
}

export default LeftSider;
