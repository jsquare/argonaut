import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ClimbGroups = new Mongo.Collection('climbGroups');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish climbGroups that are public or belong to the current user
  Meteor.publish('climbGroups', function climbGroupsPublication() {
    return ClimbGroups.find({ private: { $ne: true } });
  });
}

Meteor.methods({
  'climbGroups.addClimb'(routeGroupId, maxClimbs) {
    check(routeGroupId, String);
    check(maxClimbs, Number);

    // Make sure the user is logged in before inserting a climbGroup
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const climbGroup = ClimbGroups.findOne(
      {
        routeGroup: routeGroupId,
        climber: this.userId
      }
    );

    if (climbGroup) {
      ClimbGroups.update(
        climbGroup._id,
        // Would like to use $max and $inc here, but $max isn't available in MiniMongo
        {$set: {count: Math.min(climbGroup.count + 1, maxClimbs)}}
      );
    } else {
      ClimbGroups.insert({
        climber: this.userId,
        routeGroup: routeGroupId,
        count: 1,
      });
    };
  },
  'climbGroups.removeClimb'(routeGroupId) {
    check(routeGroupId, String);

    // Make sure the user is logged in before inserting a climbGroup
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const climbGroup = ClimbGroups.findOne(
      {
        routeGroup: routeGroupId,
        climber: this.userId
      }
    );

    if (climbGroup) {
      ClimbGroups.update(
        climbGroup._id,
        // Would like to use $min and $inc here, but $min isn't available in MiniMongo
        {$set: {count: Math.max(climbGroup.count - 1, 0)}}
      );
    };
  },
});
