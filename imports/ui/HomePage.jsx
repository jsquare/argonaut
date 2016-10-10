import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Areas} from '../api/areas.js';

import {AccountsUIWrapper, AppBar, AuthedContent, Page, Title} from './components/index.jsx';

import styles from './HomePage.scss';

const HomePage = props => {
    const areaLinks = props.areas.map(area => (
        <li key={area._id} className={styles.areaItem}>
            <Link to={`/areas/${area._id}`}>{area.name}</Link>
        </li>
    ));

    return (
        <Page>
            <AppBar>
                <Title title="SBP" />
                <AccountsUIWrapper />
            </AppBar>
            <AuthedContent>
                <ul>
                    {areaLinks}
                </ul>
            </AuthedContent>
        </Page>
    );
};


HomePage.propTypes = {
    areas: PropTypes.array.isRequired,
};

export default createContainer(
    () => {
        Meteor.subscribe('areas');

        return {
            areas: Areas.find().fetch(),
        };
    },
    HomePage
);
