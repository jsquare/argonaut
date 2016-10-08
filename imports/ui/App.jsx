import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Areas} from '../api/areas.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const Area = props => (
    <li key={props.area._id}>
        <Link to={`/areas/${props.area._id}`}>{props.area.name}</Link>
    </li>
);

Area.propTypes = {
    area: PropTypes.object.isRequired,
};

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const areasList = this.props.areas.map(area => <Area area={area} />);

        return (
          <div className="container">
            <header>
              <h1>SBP</h1>
              <AccountsUIWrapper />
            </header>
            <ul>{areasList}</ul>
          </div>
        );
    }
}

App.propTypes = {
    areas: PropTypes.array,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('areas');

    return {
        areas: Areas.find({}, {sort: {createdAt: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, App);
