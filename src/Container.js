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
        const children = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                initialState: self.state,
                handleUnmount: self.handlePlotterUnmount
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
