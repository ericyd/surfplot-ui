'use strict';

import React from 'react';
import Plotter from './plotter/Plotter';
import About from './about/About';
import Credits from './credits/Credits';

export default function ViewContainer (props) {
    if (props.view === 'Credits') {
        return <Credits />;
    } else if (props.view === 'About') {
        return <About />;
    } else {
        return <Plotter />;
    }
}
