import React from 'react';
import './icon.scss';

export default function Arrow (props) {
    return (
        <svg viewBox='0 0 30 30' {...props} >
            <path d='M0 5 L30 15 L0 25'/>
        </svg>
    );
}
