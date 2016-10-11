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

Meteor.startup(() => {
    // Empty collections
    Areas.remove({});
    Settings.remove({});
    RouteGroups.remove({});

    // Note: Assets exists even though it's not imported (https://docs.meteor.com/api/assets.html#Assets-getText)
    const areas = JSON.parse(
        Assets.getText('areas.json') // eslint-disable-line no-undef
    ).areas;

    areas.forEach(area => {
        Areas.insert({
            name: area.name,
            _id: area.slug,
        });
    });

    // Generate some random initial data for now
    areas.forEach(area => {
        const settingId = Settings.insert({
            area: area.slug,
            setDate: new Date(),
        });
        defaultRouteGroups.forEach(routeGroup => (
            RouteGroups.insert({
                color: routeGroup.color,
                difficulty: routeGroup.difficulty,
                count: Math.floor((Math.random() * 5) + 1),
                setting: settingId,
            })
        ));
    });
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
