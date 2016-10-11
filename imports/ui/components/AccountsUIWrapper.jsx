import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';
import _ from 'lodash';

import styles from './AccountsUIWrapper.scss'

class AccountsUIWrapper extends Component {
    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.renderWithData(
            Template.loginButtons,
            {align: 'right'},
            ReactDOM.findDOMNode(this.refs.container)
        );
    }
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }
    render() {
        const profilePicURL = _.get(this, 'props.user.profile.picture');
        const profilePic = profilePicURL ?
            <img src={profilePicURL} className={styles.profilePic}/> : '';

        return (
            <div className={styles.accountsUI}>
                {profilePic}
                <span ref="container" />
            </div>
        );
    }
}

AccountsUIWrapper.PropTypes = {
    user: PropTypes.object.isRequired,
};

export default AccountsUIWrapper = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    user: Meteor.user(),
  };
}, AccountsUIWrapper);