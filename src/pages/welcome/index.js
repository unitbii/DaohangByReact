/**
 * title: Home Page
 */
import Link from 'umi/link';
import locales from '@/locales';

import styles from './styles.less';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <p>{locales.index.start}</p>
        <li>
          <Link to="/welcome">welcome</Link>
        </li>
        <li>
          <Link to="/example">example</Link>
        </li>
      </ul>
    </div>
  );
}
