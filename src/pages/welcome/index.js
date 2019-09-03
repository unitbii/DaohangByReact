/**
 * title: Home Page
 */

import Link from 'umi/link';
import locales from '@/locales';
import { copyToClipboard, getQueryByKeys } from '@/common/utils/function';

import styles from './styles.less';

export default function() {
  const aaa = (str) => {
    copyToClipboard(str)
    let query = getQueryByKeys();
    console.log(query)
  }
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <p>{ locales.index.start }</p>
        <li><Link to="/welcome" onClick={() => aaa('welcome')}>welcome</Link></li>
        <li><Link to="/example" onClick={() => aaa('example')}>example</Link></li>
      </ul>
    </div>
  );
}
