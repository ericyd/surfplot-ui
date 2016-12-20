'use strict';

import React, { Component } from 'react';
import Plotter from './Plotter';
import About from './About';
import Credits from './Credits';

export default class ViewContainer extends Component {
    constructor () {
        super();

        // this will contain the Plotter state when it unmounts,
        // and send it back to Plotter when it re-mounts
        this.state = {};

        this.handlePlotterUnmount = this.handlePlotterUnmount.bind(this);
    }

    handlePlotterUnmount (state) {
        this.setState(state);
    }

    render () {
        if (this.props.view === 'Credits') {
            return <Credits />;
        } else if (this.props.view === 'About') {
            return <About />;
        } else {
            return (
                <Plotter handleUnmount={this.handlePlotterUnmount}
                    initialState={this.state} />
            );
        }
    }
}

ViewContainer.propTypes = {
    view: React.PropTypes.string
};
