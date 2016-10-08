import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';


export default class RouteGroup extends Component {
  render() {
    const {difficulty, color, count} = this.props;
    return (
      <li>
        <span>{difficulty}</span>
        <span>{color}</span>
        <span>{count}</span>
      </li>
    );
  }
}


RouteGroup.propTypes = {
  routeGroupId:  PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
