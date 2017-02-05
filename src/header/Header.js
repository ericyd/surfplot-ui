'use strict';

import React from 'react';
import Nav from './Nav';
import './Header.scss';

export default function Header (props) {
    return (
        <header className='header'>
            <img src='img/open_surface.svg' className='header__logo' alt='Surf Plot JS logo' />
            <Nav />
        </header>
    );
}
