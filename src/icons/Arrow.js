import React from 'react';
import './icon.scss';

export default function Arrow (props) {
    return (
        <svg viewBox='0 0 30 30' {...props} >
            <path d='M0 0 L15 15 L0 30 L0 0'/>
        </svg>
    );
}
