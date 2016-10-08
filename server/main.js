import '../imports/api/areas.js';
import '../imports/api/climbGroups.js';
import {Meteor} from 'meteor/meteor';
import {Areas} from '../imports/api/areas';

Meteor.startup(() => {
    // Empty collection
    Areas.remove({});

    // Insert sample data if the areas collection is empty
    // Note: Assets exists even though it's not imported (https://docs.meteor.com/api/assets.html#Assets-getText)
    JSON.parse(Assets.getText('areas.json')).areas.forEach(area => {
        Areas.insert(area);
    });
});
