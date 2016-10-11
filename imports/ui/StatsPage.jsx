import React, {PropTypes} from 'react';
// import {Meteor} from 'meteor/meteor';
// import {createContainer} from 'meteor/react-meteor-data';

import {AccountsUIWrapper, AppBar, AuthedContent, IconLink, Page, TabBar, Title} from './components/index.jsx';

const StatsPage = props => {
    return (
        <Page>
            <AppBar>
                <Title title="Stats!" />
                <AccountsUIWrapper />
                <TabBar
                    pathname={props.location.pathname}
                    tabs={[{link: '/', title: 'Areas'}, {link: '/stats', title: 'Stats'}]}
                />
            </AppBar>
            <AuthedContent>
                <div className="container">
                    Coming soon!
                </div>
            </AuthedContent>
        </Page>
    );
};

StatsPage.propTypes = {
    location: PropTypes.object,
};

export default StatsPage;
// export default createContainer(props => {
//     Meteor.subscribe('areas');
//     Meteor.subscribe('settings');
//     Meteor.subscribe('routeGroups');
//
//     const setting = Settings.findOne({area: props.params.areaId}, {sort: {setDate: -1}});
//     let routeGroups = [];
//     if (setting) {
//         routeGroups = RouteGroups.find({setting: setting._id}).fetch();
//     }
//
//     return {
//         area: Areas.findOne(props.params.areaId),
//         routeGroups: routeGroups,
//     };
// }, StatsPage);
