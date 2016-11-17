'use strict';

import React from 'react';
import './Nav.scss';

export default function Nav () {
    return (
        <nav className="nav">
            <button type="button" className="nav__btn">Main</button>
            <button type="button" className="nav__btn">About</button>
            <button type="button" className="nav__btn">Credits</button>
        </nav>
    );
}
