import '../imports/api/areas.js';
import '../imports/api/climbGroups.js';
import '../imports/api/settings.js';
import {Meteor} from 'meteor/meteor';
import {Areas} from '../imports/api/areas';
import {Settings, RouteGroups} from '../imports/api/settings';

const defaultRouteGroups = [
    {
        difficulty: 'V1-V3',
        color: 'yellow',
    },
    {
        difficulty: 'V2-V4',
        color: 'green',
    },
    {
        difficulty: 'V3-V5',
        color: 'red',
    },
    {
        difficulty: 'V4-V6',
        color: 'blue',
    },
    {
        difficulty: 'V5-V7',
        color: 'orange',
    },
    {
        difficulty: 'V6-V8',
        color: 'purple',
    },
    {
        difficulty: 'V7+',
        color: 'black',
    },
];

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    return user;
});

Meteor.startup(() => {
    // Put startup stuff here
});

ServiceConfiguration.configurations.upsert(
    {
        service: 'facebook',
    }, {
        $set: {
            appId: Meteor.settings.facebook.appId,
            loginStyle: 'popup',
            secret: Meteor.settings.facebook.secret,
        },
    }
);
