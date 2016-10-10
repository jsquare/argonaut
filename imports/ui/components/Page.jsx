import React, {PropTypes} from 'react';

const Page = props => (
    <div>
        {props.children}
    </div>
);

Page.propTypes = {
    children: PropTypes.node,
};

export default Page;
