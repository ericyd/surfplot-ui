/**
 * This component serves two purposes:
 * 1. Provide a container for the navigation and the routes served through the router
 * 2. Save the state of the Plotter component when it unmounts and send that state back to the Plotter
 *    when it remounts.
 */

'use strict';

import React, { Component } from 'react';
import Header from './header/Header';

export default class Container extends Component {
    constructor () {
        super();
        this.state = {};
        this.handlePlotterUnmount = this.handlePlotterUnmount.bind(this);
    }

    handlePlotterUnmount (state) {
        this.setState(state);
    }

    render () {
        const self = this;
        const children = React.Children.map(self.props.children, function (child) {
            return React.cloneElement(child, {
                initialState: self.state,
                handleUnmount: self.handlePlotterUnmount,
                page: child.props.route.page
            });
        });

        return (
            <div>
                <Header />
                {children}
            </div>
        );
    }
}
