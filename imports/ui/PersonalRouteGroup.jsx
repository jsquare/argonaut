import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import classnames from 'classnames';

import {ClimbGroups} from '../api/climbGroups.js';
import RouteGroup from './RouteGroup.jsx';
import styles from './RouteGroup.scss';

// Tracks one climber's progress against the total number of routes in the group
class PersonalRouteGroup extends Component {
    render() {
        const {color, count, climbedCount, difficulty} = this.props;
        return (
            <RouteGroup
              difficulty={difficulty}
              colorClassName={this.getColorClass(color, count, climbedCount)}
              onDecrement={this.removeClimb.bind(this)}
              onIncrement={this.addClimb.bind(this)}
            >
              <span className={styles.KPI}>{climbedCount}</span>
              <span className={styles.extraText}> sent</span>
              <span className={styles.KPI}> / {count}</span>
              <span className={styles.extraText}> total</span>
            </RouteGroup>
        );
    }
    getColorClass(color, count, climbedCount) {
        const allClimbed = climbedCount >= count;
        return allClimbed ? styles[color] : styles[`${color}--light`];
    }
    addClimb() {
        Meteor.call('climbGroups.addClimb', this.props.routeGroupId, this.props.count);
    }
    removeClimb() {
        Meteor.call('climbGroups.removeClimb', this.props.routeGroupId);
    }
}


PersonalRouteGroup.propTypes = {
    routeGroupId: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    climbedCount: PropTypes.number.isRequired,
};


export default createContainer(
    ({routeGroup}) => {
        Meteor.subscribe('climbGroups');

        const {difficulty, color, count, _id: routeGroupId} = routeGroup;

        const existingRouteGroup = ClimbGroups.findOne(
            {
                routeGroup: routeGroupId,
            }
        );
        return {
            climbedCount: existingRouteGroup ? existingRouteGroup.count : 0,
            color,
            count,
            difficulty,
            routeGroupId,
        };
    },
    PersonalRouteGroup
);
