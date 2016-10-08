import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';
import {Route, Router, hashHistory} from 'react-router';

import '../imports/startup/accounts-config.js';
import AreaPage from '../imports/ui/AreaPage.jsx';
import App from '../imports/ui/App.jsx';

const SiteRouter = () => (
    <Router history={hashHistory}>
        <Route path="/areas" component={App} />
        <Route path="/areas/:areaId" component={AreaPage} />
    </Router>
);

Meteor.startup(() => {
    render(<SiteRouter />, document.getElementById('render-target'));
});
