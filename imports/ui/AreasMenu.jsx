import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Areas} from '../api/areas.js';

import styles from './AreasMenu.scss';


const AreaLink = ({area}) => (
    <li>
        <Link to={`/areas/${area._id}`}>{area.name}</Link>
    </li>
);

AreaLink.propTypes = {
    area: PropTypes.object.isRequired,
};


const AreasMenu = React.createClass({
    propTypes: {
        areas: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
    },
    getInitialState() {
        return {expanded: false};
    },
    render() {
        const {areas, title} = this.props;
        const {expanded} = this.state;
        const areaLinks = areas.map(
            area => <AreaLink area={area} key={area._id} />
        );
        const header = (
            <div className={styles.menuHeader}>
                <h1>{title}</h1>
                <button
                    className={
                        expanded ?
                        styles.contractButton :
                        styles.expandButton
                    }
                    onClick={this.toggleExpanded}
                >{expanded ? '^' : '▾'}</button>
            </div>
        );
        const dropDown = (
            <nav className={styles.dropDownMenu}>
                <ul>
                    {areaLinks}
                </ul>
            </nav>
        );
        return (
            <div className={styles.menuContainer}>
                {header}
                {expanded ? dropDown : null}
            </div>
        );
    },
    toggleExpanded() {
        this.setState(
            {expanded: ! this.state.expanded}
        );
    },
});


export default createContainer(({title}) => {
    Meteor.subscribe('areas');

    return {
        areas: Areas.find({}, {sort: {createdAt: -1}}).fetch(),
        title,
    };
}, AreasMenu);
