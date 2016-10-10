import React, {PropTypes} from 'react';

import styles from './Title.scss';

const Title = props => (
    <h1 className={styles.title}>{props.title}</h1>
);

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Title;
