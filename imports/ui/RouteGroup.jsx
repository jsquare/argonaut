import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import { ClimbGroups } from '../api/climbGroups.js';
import {RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE} from '../staticData.js'

import styles from './RouteGroup.scss'


const colorStyleMapping = {
    [RED]: styles.red,
    [ORANGE]: styles.orange,
    [YELLOW]: styles.yellow,
    [GREEN]: styles.green,
    [BLUE]: styles.blue,
    [PURPLE]: styles.purple,
}

export default class RouteGroup extends Component {
  addClimb() {
    Meteor.call('climbGroups.addClimb', this.props.routeGroupId, this.props.count);
  }
  removeClimb() {
    Meteor.call('climbGroups.removeClimb', this.props.routeGroupId);
  }
  render() {
    const {difficulty, color, count, climbedCount} = this.props;
    return (
      <li className={classnames(styles.routeGroup, colorStyleMapping[color])}>
        <div>
            <button onClick={this.removeClimb.bind(this)} className={styles.decrement}>-</button>
            <div class={styles.routeGroupContent}>
                <div>{difficulty}</div>
                <div>{climbedCount} climbed / {count} total</div>
            </div>
            <button onClick={this.addClimb.bind(this)} className={styles.increment}>+</button>
        </div>
      </li>
    );
  }
}


RouteGroup.propTypes = {
  routeGroupId:  PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  climbedCount: PropTypes.number.isRequired,
};


export default createContainer(({routeGroup}) => {
  Meteor.subscribe('climbGroups');

  const {difficulty, color, count, id: routeGroupId} = routeGroup;

  const existingRouteGroup = ClimbGroups.findOne(
    {
      routeGroup: routeGroupId
    }
  );
  return {
    climbedCount: existingRouteGroup ? existingRouteGroup.count : 0,
    difficulty,
    color,
    count,
    routeGroupId
  };
}, RouteGroup);
