import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Area = new SimpleSchema({
    name: {
        type: String,
        label: 'Human-readable name of the area',
    },
    slug: {
        type: String,
        label: 'Slugified version of human-readable name. NOTE: this is *also* stored as the _id!',
    },
});

export const ClimbGroup = new SimpleSchema({
    climber: {
        type: String,
        label: 'User ID of the person who completed this group of climbs',
    },
    routeGroup: {
        type: String,
        label: 'ID of route group which was climbed',
    },
    count: {
        type: Number,
        label: 'Number of climbs completed by this user on this RouteGroup',
    },
});

export const RouteGroup = new SimpleSchema({
    color: {
        type: String,
        label: 'CSS-compatible color corresponding to the routes in this group',
    },
    difficulty: {
        type: String,
        label: 'Human-readable difficulty range that these routes fall into',
    },
    count: {
        type: Number,
        label: 'Number of routes in this RouteGroup',
    },
    setting: {
        type: String,
        label: 'ID of the Setting in which this RouteGroup was created',
    },
});

export const Setting = new SimpleSchema({
    setDate: {
        type: Date,
        label: 'Date on which this Setting was completed',
    },
    area: {
        type: String,
        label: 'ID of the area where this Setting is located',
    },
});
