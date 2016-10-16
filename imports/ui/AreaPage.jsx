import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router';

import {Areas} from '../api/areas.js';
import {Settings, RouteGroups} from '../api/settings.js';
import {getAreaResetUrl} from './areaUrls';
import {AppBar, AuthedContent, IconLink, Page, Title} from './components/index.jsx';
import PersonalRouteGroup from './PersonalRouteGroup.jsx';

import styles from './AreaPage.scss';

class AreaPage extends Component {
    renderRouteGroups(routeGroups) {
        return routeGroups.map(routeGroup => {
            return (
                <PersonalRouteGroup
                  key={routeGroup._id}
                  routeGroup={routeGroup}
                />
            );
        });
    }

    render() {
        const {area, routeGroups} = this.props;
        const editLink = area ? (
            <div className={styles.resetButton}>
                <IconLink to={`/areas/${area._id}/reset`} icon="create" alt="Reset routes" />
            </div>
        ) : '';
        const noSettingHelpText = (
            (area && ! routeGroups.length) ? (
                <span className="helpText">
                    Route counts haven't been entered yet for this area.
                    You could be the first to <Link to={getAreaResetUrl(area._id)}>set</Link> them!
                </span>
            ) : ''
        );
        const mainContent = (
            routeGroups.length ?
            (
                <ul className={styles.ul}>
                    {this.renderRouteGroups(routeGroups)}
                </ul>
            ) : ''
        );
        return (
            <Page>
                <AppBar>
                    <IconLink to="/" icon="arrow_back" />
                    <Title title={area ? area.name : 'loading...'} />
                    {editLink}
                </AppBar>
                <AuthedContent>
                    <div className="container">
                        {noSettingHelpText}
                        {mainContent}
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
