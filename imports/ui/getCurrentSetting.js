import {Settings} from '../api/settings.js';

const getCurrentSetting = areaId => Settings.findOne({area: areaId}, {sort: {setDate: -1}});

export default getCurrentSetting;
