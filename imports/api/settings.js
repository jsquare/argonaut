import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Settings = new Mongo.Collection('settings');
export const RouteGroups = new Mongo.Collection('routeGroups');

if (Meteor.isServer) {
    // This code only runs on the server
    // Publish all Settings
    Meteor.publish('settings', () => {
        return Settings.find();
    });

    Meteor.publish('routeGroups', () => {
        return RouteGroups.find();
    });
}

Meteor.methods({
    'settings.insert'(areaId, routeGroups) {
        check(routeGroups, Array);

        const settingId = Settings.insert({
            setDate: new Date(),
            area: areaId,
        });

        // Create each RouteGroup and point to this settings
        routeGroups.map(routeGroup => {
            RouteGroups.insert({
                color: routeGroup.color,
                difficulty: routeGroup.difficulty,
                count: routeGroup.count,
                setting: settingId,
            });
        });
    },
});
