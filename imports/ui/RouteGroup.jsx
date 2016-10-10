import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import classnames from 'classnames';

import {ClimbGroups} from '../api/climbGroups.js';

import styles from './RouteGroup.scss';

class RouteGroup extends Component {
    getColorClass(color, count, climbedCount) {
        const allClimbed = climbedCount >= count;
        return allClimbed ? styles[color] : styles[`${color}--light`];
    }
    render() {
        const {difficulty, color, count, climbedCount} = this.props;
        const colorClassName = this.getColorClass(color, count, climbedCount);
        return (
            <li className={classnames(styles.routeGroup, colorClassName)}>
                <button onClick={this.removeClimb.bind(this)} className={styles.button}>-</button>
                <div className={styles.routeGroupContent}>
                    <div className={styles.difficulty}>{difficulty} </div>
                    <div className={styles.climbCount}>
                        <span className={styles.KPI}>{climbedCount}</span>
                        <span className={styles.extraText}> sent</span>
                        <span className={styles.KPI}> / {count}</span>
                        <span className={styles.extraText}> total</span>
                    </div>
                </div>
                <button onClick={this.addClimb.bind(this)} className={styles.button}>+</button>
            </li>
        );
    }
    addClimb() {
        Meteor.call('climbGroups.addClimb', this.props.routeGroupId, this.props.count);
    }
    removeClimb() {
        Meteor.call('climbGroups.removeClimb', this.props.routeGroupId);
    }
}


RouteGroup.propTypes = {
    routeGroupId: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    climbedCount: PropTypes.number.isRequired,
};


export default createContainer(
    ({routeGroup}) => {
        Meteor.subscribe('climbGroups');

        const {difficulty, color, count, id: routeGroupId} = routeGroup;

        const existingRouteGroup = ClimbGroups.findOne(
            {
                routeGroup: routeGroupId,
            }
        );
        return {
            climbedCount: existingRouteGroup ? existingRouteGroup.count : 0,
            difficulty,
            color,
            count,
            routeGroupId,
        };
    },
    RouteGroup
);
