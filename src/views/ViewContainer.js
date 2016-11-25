'use strict';

import React, { Component } from 'react';
import Plotter from './plotter/Plotter';
import About from './About';
import Credits from './Credits';

export default class ViewContainer extends Component {
    constructor () {
        super();

        // this contains the initialization for the Plotly plot
        this.state = {
            test: 'this is a test'
        };
    }

    render () {
        if (this.props.view === 'Credits') {
            return <Credits />;
        } else if (this.props.view === 'About') {
            return <About />;
        } else {
            return <Plotter />;
        }
    }
}
