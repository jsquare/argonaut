import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router';

import {Areas} from '../api/areas.js';
import {Settings, RouteGroups} from '../api/settings.js';
import {AccountsUIWrapper, AppBar, AreaEditTabBar, AuthedContent, IconLink, Page, Title} from './components/index.jsx';
import {getAreaPageUrl, getAreaResetUrl, getAreaUpdateUrl} from './areaUrls';
import RouteGroup from './RouteGroup.jsx';
import routeGroupStyles from './RouteGroup.scss';
import styles from './AreaPage.scss';


class AreaUpdatePage extends Component {
    renderRouteGroups() {
        return this.props.routeGroups.map(
            (routeGroup, i) => {
                return (
                    <RouteGroup
                      key={i}
                      onIncrement={this.addRoute(routeGroup._id).bind(this)}
                      onDecrement={this.removeRoute(routeGroup._id).bind(this)}
                      difficulty={routeGroup.difficulty}
                      colorClassName={routeGroupStyles[routeGroup.color]}
                    >
                        <span className={routeGroupStyles.KPI}>{routeGroup.count}</span>
                        <span className={routeGroupStyles.extraText}> routes</span>
                    </ RouteGroup>
                );
            }
        );
    }
    render() {
        const {area, routeGroups} = this.props;
        const {_id: areaId} = area || {};
        const appBar = (
            area ? (
                <AppBar>
                    <IconLink to={getAreaPageUrl(areaId)} icon="arrow_back" />
                    <Title title={`${area.name} - Update`} />
                    <AccountsUIWrapper />
                    <AreaEditTabBar
                        areaId={areaId}
                        pathName={getAreaUpdateUrl(areaId)}
                    />
                </AppBar>
            ) : <AppBar>Loading...</AppBar>
        );
        return (
            <Page>
                {appBar}
                <AuthedContent>
                    <div className="container">
                        <span className="helpText">
                            Use this page only to tweak route numbers that were set incorrectly.
                            To enter in a whole new set of routes, use <Link to={getAreaResetUrl(areaId)}>Reset</Link>.
                        </span>
                        <ul className={styles.ul}>
                            {routeGroups && this.renderRouteGroups(routeGroups)}
                        </ul>
                    </div>
                </AuthedContent>
            </Page>
        );
    }
    addRoute(routeGroupId) {
        return () => {Meteor.call('routeGroups.addRoute', routeGroupId);};
    }
    removeRoute(routeGroupId) {
        return () => {Meteor.call('routeGroups.removeRoute', routeGroupId);};
    }
}

AreaUpdatePage.propTypes = {
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
}, AreaUpdatePage);
