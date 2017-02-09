/**
 * Modified from iconmonstr
 * http://iconmonstr.com/check-mark-2/
 */
import React from 'react';
import Icon from './Icon';

const Checkmark = props => (
    <Icon className={props.className}>
        <path d="M 37.372881,97.035 0,61.165339 11.589746,49.247542 37.152797,73.639576 87.855339,21.998559 99.661017 33.696271 z" />
    </Icon>
);

Checkmark.propTypes = {
    className: React.PropTypes.string
};

export default Checkmark;
