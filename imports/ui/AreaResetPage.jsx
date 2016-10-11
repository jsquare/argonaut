import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import {Areas} from '../api/areas.js';
import {Settings, RouteGroups} from '../api/settings.js';
import {AccountsUIWrapper, AppBar, AuthedContent, IconLink, Page, Title} from './components/index.jsx';
import RouteGroup from './RouteGroup.jsx';
import styles from './areaResetPage.scss';
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
    getParentUrl() {
        return `/areas/${this.props.area._id}`
    },
    render() {
        const {area, routeGroups} = this.props;
        const title = area ? `${area.name} - Reset` : 'loading...';
        const iconLink = area ? <IconLink to={this.getParentUrl()} icon="cancel" /> : '';
        return (
            <Page>
                <AppBar>
                    {iconLink}
                    <Title title={title} />
                    <AccountsUIWrapper />
                </AppBar>
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
        const confirmed = window.confirm("If you hit 'OK', climbers will immediately see this new route set and the old route set will be archived.");
        if (confirmed) {
            Meteor.call('settings.insert', this.props.area._id, this.state.routeGroups);
            browserHistory.push(this.getParentUrl());
        }
    }
});

AreaResetPage.propTypes = {
    area: PropTypes.object,
    routeGroups: PropTypes.array,
};


export default createContainer(props => {
    Meteor.subscribe('areas');

    return {
        area: Areas.findOne(props.params.areaId),
    };
}, AreaResetPage);
