/**
 * This is used for the Electron build.
 * The menu bar handles all other views,
 * so we only need to mount the plotter.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Plotter from './views/Plotter';
import './index.scss';

if (typeof window !== undefined) {
    ReactDOM.render(
        <Plotter />,
        document.getElementById('root')
    );
}
