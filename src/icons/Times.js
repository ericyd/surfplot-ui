import React from 'react';
import Icon from './Icon';

const Times = props => (
    <Icon className={props.className}>
        <path d='M10 10 L90 90 M90 10 L 10 90' />
    </Icon>
);

Times.propTypes = {
    className: React.PropTypes.string
};

export default Times;
