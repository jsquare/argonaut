import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

// import {routeGroups} from '../staticData.js';
import {Areas} from '../api/areas.js';

import RouteGroup from './RouteGroup.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import styles from './AreaPage.scss';

class AreaPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderRouteGroups(routeGroups) {
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
                    <h1>{this.props.area && this.props.area.name}</h1>
                    <AccountsUIWrapper />
                </header>

                <ul className={styles.ul}>
                    {this.props.area && this.props.area.routeGroups && this.renderRouteGroups(this.props.area.routeGroups)}
                </ul>
            </div>
        );
    }
}

AreaPage.propTypes = {
    area: PropTypes.object,
    currentUser: PropTypes.object,
};

export default createContainer(props => {
    Meteor.subscribe('areas');

    return {
        area: Areas.findOne(props.params.areaId),
        currentUser: Meteor.user(),
    };
}, AreaPage);
