import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Areas} from '../api/areas.js';
import {RouteGroups} from '../api/settings.js';
import {ClimbGroups} from '../api/climbGroups.js';

import {AccountsUIWrapper, AppBar, AuthedContent, Page, StatsChart, TabBar, Title} from './components/index.jsx';
import getCurrentSetting from './getCurrentSetting.js';

const StatsPage = props => {
    return (
        <Page>
            <AppBar>
                <Title title="Stats" />
                <AccountsUIWrapper />
                <TabBar
                    pathname={props.location.pathname}
                    tabs={[{link: '/', title: 'Areas'}, {link: '/stats', title: 'Stats'}]}
                />
            </AppBar>
            <AuthedContent>
                <h1>Your Climbs</h1>
                <p>Your progress on currently set routes at SBP</p>
                <StatsChart data={props.data} />
            </AuthedContent>
        </Page>
    );
};

StatsPage.propTypes = {
    location: PropTypes.object,
    data: PropTypes.array,
};

export default createContainer(props => {
    const subscriptions = [
        Meteor.subscribe('areas'),
        Meteor.subscribe('settings'),
        Meteor.subscribe('routeGroups'),
        Meteor.subscribe('climbGroups'),
    ];

    if (!_.every(subscriptions, subscription => subscription.ready())) {
        return {
            data: [],
        };
    }

    const areas = Areas.find().fetch();
    const currentSettings = areas.map(area => getCurrentSetting(area._id));

    // Find all current route groups
    const currentRouteGroups = RouteGroups.find({setting: {$in: _.map(currentSettings, '_id')}}).fetch();
    const routeGroupsByDifficulty = _.groupBy(currentRouteGroups, 'difficulty');

    const data = Object.keys(routeGroupsByDifficulty).map(difficulty => {
        const routeGroups = routeGroupsByDifficulty[difficulty];
        const routesCount = _.sum(routeGroups.map(routeGroup => routeGroup.count));
        const climbedCount = _.sum(routeGroups.map(routeGroup => {
            return _.get(ClimbGroups.findOne({routeGroup: routeGroup._id}), 'count', 0);
        }));

        return {
            difficulty,
            routesCount,
            climbedCount,
            color: routeGroups[0].color, // Assumes all route groups of same difficulty are same color
        };
    });

    return {
        data,
    };
}, StatsPage);
