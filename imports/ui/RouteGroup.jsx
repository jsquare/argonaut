import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import { ClimbGroups } from '../api/climbGroups.js';


export default class RouteGroup extends Component {
  addClimb() {
    Meteor.call('climbGroups.addClimb', this.props.routeGroupId);
  }
  removeClimb() {
    Meteor.call('climbGroups.removeClimb', this.props.routeGroupId);
  }
  render() {
    const {difficulty, color, count, climbedCount} = this.props;
    return (
      <li>
        <span>{difficulty} - </span>
        <span>{color} - </span>
        <span>{climbedCount} climbed / {count} total</span>
        <button onClick={this.addClimb.bind(this)}>+</button>
        <button onClick={this.removeClimb.bind(this)}>-</button>
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
