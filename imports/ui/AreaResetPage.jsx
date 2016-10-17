import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import moment from 'moment';
import _ from 'lodash';

import {Areas} from '../api/areas.js';
import {Settings} from '../api/settings.js';
import {AccountsUIWrapper, AppBar, AreaEditTabBar, AuthedContent, IconLink, Page, Title} from './components/index.jsx';
import {getAreaPageUrl, getAreaResetUrl} from './areaUrls';
import RouteGroup from './RouteGroup.jsx';
import styles from './AreaResetPage.scss';
import areaPageStyles from './AreaPage.scss';
import routeGroupStyles from './RouteGroup.scss';


const defaultRouteGroups = [
    {
        difficulty: 'V1-V3',
        color: 'yellow',
        count: 0,
    },
    {
        difficulty: 'V2-V4',
        color: 'green',
        count: 0,
    },
    {
        difficulty: 'V3-V5',
        color: 'red',
        count: 0,
    },
    {
        difficulty: 'V4-V6',
        color: 'blue',
        count: 0,
    },
    {
        difficulty: 'V5-V7',
        color: 'orange',
        count: 0,
    },
    {
        difficulty: 'V6-V8',
        color: 'purple',
        count: 0,
    },
    {
        difficulty: 'V7+',
        color: 'black',
        count: 0,
    },
];


// The page where you reset the routegroup for an area
const AreaResetPage = React.createClass({
    propTypes: {
        area: PropTypes.object,
        routeGroups: PropTypes.array,
        lastSetDate: PropTypes.instanceOf(Date),
    },

    getInitialState() {
        return {
            routeGroups: _.cloneDeep(defaultRouteGroups),
        };
    },

    getRouteIncrementer(routeSetIndex, delta) {
        return () => {
            const newState = _.cloneDeep(this.state);
            newState.routeGroups[routeSetIndex].count += delta;
            this.setState(newState);
        };
    },
    renderRouteGroups() {
        return this.state.routeGroups.map((routeGroup, i) => {
            return (
                <RouteGroup
                  key={i}
                  onIncrement={this.getRouteIncrementer(i, 1).bind(this)}
                  onDecrement={this.getRouteIncrementer(i, -1).bind(this)}
                  difficulty={routeGroup.difficulty}
                  colorClassName={routeGroupStyles[routeGroup.color]}
                >
                    <span className={routeGroupStyles.KPI}>{routeGroup.count}</span>
                    <span className={routeGroupStyles.extraText}> routes</span>
                </ RouteGroup>
            );
        });
    },
    render() {
        const {area, routeGroups} = this.props;
        const {_id: areaId} = area || {};
        const appBar = (
            area ? (
                <AppBar>
                    <IconLink to={getAreaPageUrl(areaId)} icon="cancel" />
                    <Title title={`${area.name} - Reset`} />
                    <AreaEditTabBar
                        areaId={areaId}
                        pathName={getAreaResetUrl(areaId)}
                    />
                </AppBar>
            ) : <AppBar>Loading...</AppBar>
        );
        return (
            <Page>
                {appBar}
                <AuthedContent>
                    <div className="container">
                        <ul className={areaPageStyles.ul}>
                            {this.renderRouteGroups(routeGroups)}
                        </ul>
                        <button onClick={this.commitRouteGroups} className={styles.setButton}>Set</button>
                    </div>
                </AuthedContent>
            </Page>
        );
    },
    commitRouteGroups() {
        const lastSet = moment(this.props.lastSetDate).fromNow();
        const lastSetInfo = (
            this.props.lastSetDate ?
            ` and the previous route set (from ${lastSet}) will be archived`
            : '' // If there's no lastSetDate, it hasn't been set so nothing will be archived!
        );
        const confirmed = window.confirm(
            `If you hit 'OK', all climbers will immediately see this new route set${lastSetInfo}.`
        );
        if (confirmed) {
            Meteor.call('settings.insert', this.props.area._id, this.state.routeGroups);
            browserHistory.push(getAreaPageUrl(this.props.area._id));
        }
    },
});


export default createContainer(props => {
    Meteor.subscribe('areas');
    Meteor.subscribe('settings');

    const area = Areas.findOne(props.params.areaId);
    const setting = Settings.findOne({area: props.params.areaId}, {sort: {setDate: -1}});
    const setDate = setting ? setting.setDate : null;
    return {
        area,
        lastSetDate: setDate,
    };
}, AreaResetPage);
