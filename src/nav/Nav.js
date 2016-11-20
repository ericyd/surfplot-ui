'use strict';

import React from 'react';
import './Nav.scss';

export default function Nav () {
    const buttons = ['Main', 'About', 'Credits'];

    return (
        <nav className="nav">
            {
                buttons.map((btn) => {
                    return <button type="button" className="nav__btn">{btn}</button>;
                })
            }
        </nav>
    );
}
