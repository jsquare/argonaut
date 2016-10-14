import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Area} from './schemas';

export const Areas = new Mongo.Collection('areas');
Areas.attachSchema(Area);

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
    // Currently Areas are 
});
