import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Areas} from '../api/areas.js';
import {Settings, RouteGroups} from '../api/settings.js';

import {AccountsUIWrapper, AppBar, AuthedContent, IconLink, Page, Title} from './components/index.jsx';
import RouteGroup from './RouteGroup.jsx';

import styles from './AreaPage.scss';

class AreaPage extends Component {
    renderRouteGroups(routeGroups) {
        return routeGroups.map(routeGroup => {
            return (
                <RouteGroup
                  key={routeGroup._id}
                  routeGroup={routeGroup}
                />
            );
        });
    }

    render() {
        const {area, routeGroups} = this.props;
        return (
            <Page>
                <AppBar>
                    <IconLink to="/" icon="arrow_back" />
                    <Title title={area ? area.name : 'loading...'} />
                    <AccountsUIWrapper />
                </AppBar>
                <AuthedContent>
                    <div className="container">
                        <ul className={styles.ul}>
                            {routeGroups && this.renderRouteGroups(routeGroups)}
                        </ul>
                    </div>
                </AuthedContent>
            </Page>
        );
    }
}

AreaPage.propTypes = {
    area: PropTypes.object,
    routeGroups: PropTypes.array,
};


export default createContainer(props => {
    Meteor.subscribe('areas');
    Meteor.subscribe('settings');
    Meteor.subscribe('routeGroups');

    const setting = Settings.findOne({area: props.params.areaId}, {sort: {setDate: -1}});
    let routeGroups = [];
    if (setting) {
        routeGroups = RouteGroups.find({setting: setting._id}).fetch();
    }

    return {
        area: Areas.findOne(props.params.areaId),
        routeGroups: routeGroups,
    };
}, AreaPage);
