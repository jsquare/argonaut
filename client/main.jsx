import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';

import '../imports/startup/accounts-config.js';
import AreaPage from '../imports/ui/AreaPage.jsx';
import AreaResetPage from '../imports/ui/AreaResetPage.jsx';
import AreaUpdatePage from '../imports/ui/AreaUpdatePage.jsx';
import HomePage from '../imports/ui/HomePage.jsx';
import StatsPage from '../imports/ui/StatsPage.jsx';

const SiteRouter = () => (
    <Router history={browserHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/areas/:areaId" component={AreaPage} />
        <Route path="/areas/:areaId/reset" component={AreaResetPage} />
        <Route path="/areas/:areaId/update" component={AreaUpdatePage} />
        <Route path="/stats" component={StatsPage} />
    </Router>
);

Meteor.startup(() => {
    render(<SiteRouter />, document.getElementById('render-target'));
});
