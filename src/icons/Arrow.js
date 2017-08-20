/**
 * Icon uses a 100x100 grid for layout
 */
import React from 'react';
import Icon from './Icon';

const Arrow = props => (
    <Icon className={props.className}>
        <path d='M0 10 L40 50 L0 90 L0 10'/>
    </Icon>
);

Arrow.propTypes = {
    className: React.PropTypes.string
};

export default Arrow;
