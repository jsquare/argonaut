import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

import styles from './TabBar.scss';


const TabBar = props => {
    const tabLinks = props.tabs.map(tab => {
        const isActive = tab.link === props.pathname;
        const activeStyle = (isActive ? styles.tabActive : styles.tabInactive);
        return <Link to={tab.link} key={tab.title} className={classnames(styles.tabLink, activeStyle)}>{tab.title}</Link>;
    });

    return (
        <div className={styles.tabBar}>{tabLinks}</div>
    );
};

TabBar.propTypes = {
    pathname: PropTypes.string.isRequired,
    tabs: PropTypes.array,
};

export default TabBar;
