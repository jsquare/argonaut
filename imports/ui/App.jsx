import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Tasks} from '../api/tasks.js';
import {routeGroups} from '../staticData.js';

import Task from './Task.jsx';
import RouteGroup from './RouteGroup.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import styles from './App.scss';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderRouteGroups() {
    return routeGroups.map(routeGroup => {
      return (
        <RouteGroup
          key={routeGroup.id}
          routeGroup={routeGroup}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>The Prow</h1>
          <AccountsUIWrapper />
        </header>

        <ul className={styles.ul}>
          {this.renderRouteGroups()}
        </ul>
      </div>
    );
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
}, App);
