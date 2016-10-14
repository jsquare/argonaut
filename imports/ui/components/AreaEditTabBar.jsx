import React, {PropTypes} from 'react';
import {getAreaUpdateUrl, getAreaResetUrl} from '../areaUrls';
import TabBar from './TabBar.jsx';


const AreaEditTabBar = ({areaId, pathName}) => (
    <TabBar
        pathname={pathName}
        tabs={[
            {
                link: getAreaUpdateUrl(areaId),
                title: 'Update',
            },
            {
                link: getAreaResetUrl(areaId),
                title: 'Reset',
            },
        ]}
    />
);


AreaEditTabBar.propTypes = {
    areaId: PropTypes.string.isRequired,
    pathName: PropTypes.string.isRequired,
};


export default AreaEditTabBar;
