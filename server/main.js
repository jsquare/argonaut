import '../imports/api/areas.js';
import '../imports/api/climbGroups.js';
import {Meteor} from 'meteor/meteor';
import {Areas} from '../imports/api/areas';

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

// From https://jsfiddle.net/briguy37/2MVFd/
function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function generateDefaultRouteGroups() {
    return defaultRouteGroups.map(routeGroup => {
        routeGroup.count = 0;
        routeGroup.id = generateUUID();

        return routeGroup;
    });
}


Meteor.startup(() => {
    // Empty collection
    Areas.remove({});

    // Insert sample data if the areas collection is empty
    // Note: Assets exists even though it's not imported (https://docs.meteor.com/api/assets.html#Assets-getText)
    JSON.parse(
        Assets.getText('areas.json') // eslint-disable-line no-undef
    ).areas.forEach(area => {
        if (!area.routeGroups) {
            area.routeGroups = generateDefaultRouteGroups();
        }
        Areas.insert(area);
    });
});
