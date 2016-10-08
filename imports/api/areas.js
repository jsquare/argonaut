import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Areas = new Mongo.Collection('areas');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish areas that are public or belong to the current user
    Meteor.publish('areas', function areasPublication() {
        return Areas.find({
            $or: [
                {private: {$ne: true}},
                {owner: this.userId},
            ],
        });
    });
}

Meteor.methods({
    'areas.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a area
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Areas.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'areas.remove'(areaId) {
        check(areaId, String);

        const area = Areas.findOne(areaId);
        if (area.private && area.owner !== this.userId) {
            // If the area is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Areas.remove(areaId);
    },
    'areas.setChecked'(areaId, setChecked) {
        check(areaId, String);
        check(setChecked, Boolean);

        const area = Areas.findOne(areaId);
        if (area.private && area.owner !== this.userId) {
            // If the area is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Areas.update(areaId, {$set: {checked: setChecked}});
    },
    'areas.setPrivate'(areaId, setToPrivate) {
        check(areaId, String);
        check(setToPrivate, Boolean);

        const area = Areas.findOne(areaId);

        // Make sure only the area owner can make a area private
        if (area.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Areas.update(areaId, {$set: {private: setToPrivate}});
    },
});
