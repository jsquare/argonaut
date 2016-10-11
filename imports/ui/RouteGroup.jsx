import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

import {ClimbGroups} from '../api/climbGroups.js';

import styles from './RouteGroup.scss';


const RouteGroup = ({children, colorClassName, difficulty, onDecrement, onIncrement}) => (
    <li className={classnames(styles.routeGroup, colorClassName)}>
        <button onClick={onDecrement} className={styles.button}>-</button>
        <div className={styles.routeGroupContent}>
            <div className={styles.difficulty}>{difficulty}</div>
            <div className={styles.kpiContainer}>
                {children}
            </div>
        </div>
        <button onClick={onIncrement} className={styles.button}>+</button>
    </li>
);


RouteGroup.propTypes = {
    difficulty: PropTypes.string.isRequired,
    colorClassName: PropTypes.string.isRequired,
    // Children will be displayed in the main area between increment/decrement buttons
    children: PropTypes.node.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
};

export default RouteGroup;