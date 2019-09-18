import config from '@/common/config';

import SimpleLayout from './common/SimpleLayout';
import DefaultLayout from './common/DefaultLayout';

const { SimpleLayoutList } = config;

function BasicLayout(props) {
  if (SimpleLayoutList.indexOf(props.location.pathname) !== -1) {
    return <SimpleLayout>{props.children}</SimpleLayout>;
  }

  return <DefaultLayout>{props.children}</DefaultLayout>;
}

export default BasicLayout;
