'use strict';

import React from 'react';
import { Link } from 'react-router';
import './Nav.scss';

export default function Nav (props) {
    const buttons = [
        { title: 'Plotter', href: '' },
        { title: 'About', href: 'about' },
        { title: 'Credits', href: 'credits' }];

    return (
        <nav className='nav'>
            {
                buttons.map((btn) => {
                    return (<Link to={`/${btn.href}`}
                                key={btn.title}
                                name={btn.title}
                                className='nav__btn'
                                activeClassName='nav__btn--active'>
                                {btn.title}
                            </Link>
                    );
                })
            }
        </nav>
    );
}
