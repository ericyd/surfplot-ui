'use strict';

import React from 'react';
import Nav from '../nav/Nav';
import './Header.scss';

export default function Header () {
    return (
        <header className="header">
            <img src="img/open_surface.svg" className="header__logo" alt="Surf Plot JS logo" />
            <Nav />
        </header>
    );
}
