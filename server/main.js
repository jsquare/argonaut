import '../imports/api/areas.js';
import '../imports/api/climbGroups.js';
import '../imports/api/settings.js';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ServiceConfiguration} from 'meteor/service-configuration';
import {Areas} from '../imports/api/areas';


Accounts.onCreateUser((options, user) => {
    if (options.profile) {
        options.profile.picture = `https://graph.facebook.com/${user.services.facebook.id}/picture/?type=large`;
        user.profile = options.profile;
    }
    return user;
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


Meteor.startup(() => {
    // Note: Assets exists even though it's not imported (https://docs.meteor.com/api/assets.html#Assets-getText)
    const areas = JSON.parse(
        Assets.getText('areas.json') // eslint-disable-line no-undef
    ).areas;


    areas.forEach(area => {
        Areas.upsert(
            area.slug,
            {
                $set: {
                    name: area.name,
                    slug: area.slug,
                },
            }
        );
    });
});
