import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

import styles from './IconLink.scss';

const IconLink = props => (
    <Link to={props.to} className={styles.iconLink}>
        <i className={classnames('material-icons', styles.icon)}>{props.icon}</i>
    </Link>
);

IconLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default IconLink;
