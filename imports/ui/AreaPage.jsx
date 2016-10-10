import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Areas} from '../api/areas.js';

import {AccountsUIWrapper, AppBar, AuthedContent, IconLink, Page, Title} from './components/index.jsx';
import RouteGroup from './RouteGroup.jsx';

import styles from './AreaPage.scss';

class AreaPage extends Component {
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
            <Page>
                <AppBar>
                    <IconLink to="/" icon="arrow_back" />
                    <Title title={this.props.area ? this.props.area.name : 'loading...'} />
                    <AccountsUIWrapper />
                </AppBar>
                <AuthedContent>
                    <div className="container">
                        <ul className={styles.ul}>
                            {this.props.area && this.props.area.routeGroups && this.renderRouteGroups(this.props.area.routeGroups)}
                        </ul>
                    </div>
                </AuthedContent>
            </Page>
        );
    }
}

AreaPage.propTypes = {
    area: PropTypes.object,
};

export default createContainer(props => {
    Meteor.subscribe('areas');

    return {
        area: Areas.findOne(props.params.areaId),
    };
}, AreaPage);
