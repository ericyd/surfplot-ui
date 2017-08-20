/**
 * A base class for icons.
 * The outer svg is set to 1em x 1em.
 * The inner svg is 75% of that for proper visual weight.
 */

import React from 'react';
import './icon.scss';

const Icon = props => (
    <svg viewBox='0 0 100 100'
        className={['icon', props.className].join(' ')}>
        <svg x='12.5'
            y='12.5'
            width='75'
            height='75'
            viewBox='0 0 100 100'
            strokeWidth='10'
            strokeLinecap='round'
            strokeLinejoin='round'>
            {props.children}
        </svg>
    </svg>
);

Icon.propTypes = {
    className: React.PropTypes.string
};

export default Icon;
