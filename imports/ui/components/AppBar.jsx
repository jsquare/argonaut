import React, {PropTypes} from 'react';

import styles from './AppBar.scss';

const AppBar = props => (
    <div className={styles.appBar}>
        {props.children}
    </div>
);

AppBar.propTypes = {
    children: PropTypes.node,
};

export default AppBar;
