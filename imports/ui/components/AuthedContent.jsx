import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

const AuthedContent = props => (
    <div>
        {props.currentUser ? props.children : 'Please Login'}
    </div>
);

AuthedContent.propTypes = {
    currentUser: PropTypes.object,
    children: PropTypes.node,
};

export default createContainer(props => {
    return {
        currentUser: Meteor.user(),
        children: props.children,
    };
}, AuthedContent);
