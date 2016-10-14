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

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

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
    'routeGroups.addRoute'(routeGroupId) {
        check(routeGroupId, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        RouteGroups.update(
            routeGroupId,
            {$inc: {count: 1}}
        );
    },
    'routeGroups.removeRoute'(routeGroupId) {
        check(routeGroupId, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const routeGroup = RouteGroups.findOne(routeGroupId);
        if (routeGroup) {
            RouteGroups.update(
                routeGroup._id,
                // Would like to use $min and $dec here, but $min isn't available in MiniMongo
                {$set: {count: Math.max(routeGroup.count - 1, 0)}}
            );
        }
    },
});
