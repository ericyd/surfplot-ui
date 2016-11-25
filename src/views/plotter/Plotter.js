'use strict';

import React, { Component } from 'react';
import FunctionBar from './FunctionBar';
import OptionBar from './OptionBar';

export default class Plotter extends Component {
    constructor () {
        super();
        this.state = {
            isFunctionBarCollapsed: true,
            isOptionBarCollapsed: true,
            test: true
        };

        this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    }

    componentWillMount () {
        // if this.props.initialState is not empty, set as original state
        if (Object.keys(this.props.initialState).length !== 0 && this.props.initialState.constructor === Object) {
            this.setState(this.props.initialState);
        }
    }

    componentWillUnmount () {
        // save the state in the parent before it unmounts so it is still here when it returns
        this.props.handleUnmount(this.state);
    }

    handleSidebarToggle (e) {
        switch (e.target.name) {
            case 'functionBarToggle':
                this.setState({ isFunctionBarCollapsed: !this.state.isFunctionBarCollapsed });
                break;

            case 'optionBarToggle':
                this.setState({ isOptionBarCollapsed: !this.state.isOptionBarCollapsed });
                break;

            default:
                break;
        }
    }

    render () {
        return (
            <div>
                <button type='button'
                    name='functionBarToggle'
                    onClick={this.handleSidebarToggle}>
                    Toggle the FunctionBar
                </button>
                <FunctionBar isCollapsed={this.state.isFunctionBarCollapsed} />

                <button type='button'
                    name='optionBarToggle'
                    onClick={this.handleSidebarToggle}>
                    Toggle the OptionBar
                </button>
                <OptionBar isCollapsed={this.state.isOptionBarCollapsed} />
            </div>
        );
    }
}

Plotter.propTypes = {
    handleUnmount: React.PropTypes.func.isRequired,
    initialState: React.PropTypes.object.isRequired
};
