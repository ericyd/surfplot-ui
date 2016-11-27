'use strict';

import React, { Component } from 'react';
import EquationBar from './equations/EquationBar';
import OptionBar from './options/OptionBar';
import Plot from './Plot';
import './plotter.scss';

export default class Plotter extends Component {
    constructor () {
        super();
        this.state = {
            isEquationBarCollapsed: true,
            isOptionBarCollapsed: true,
            equations: [
                {
                    id: 1,
                    value: 'cos(x)-sin(y)'
                }
            ]
        };

        this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
        this.addEquation = this.addEquation.bind(this);
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
            case 'equationBarToggle':
                this.setState({ isEquationBarCollapsed: !this.state.isEquationBarCollapsed });
                break;

            case 'optionBarToggle':
                this.setState({ isOptionBarCollapsed: !this.state.isOptionBarCollapsed });
                break;

            default:
                break;
        }
    }

    addEquation () {
        const equations = this.state.equations;
        // get max id for next id
        equations.push({ value: '' });
        this.setState({
            equations: equations
        });
    }

    render () {
        return (
            <div className='plotter'>
                <button type='button'
                    name='equationBarToggle'
                    onClick={this.handleSidebarToggle}
                    className='toggleButton left'>
                    Toggle the EquationBar
                </button>
                <EquationBar
                    isCollapsed={this.state.isEquationBarCollapsed}
                    equations={this.state.equations}
                    addEquation={this.addEquation}
                    />

                <button type='button'
                    name='optionBarToggle'
                    onClick={this.handleSidebarToggle}
                    className='toggleButton right'>
                    Toggle the OptionBar
                </button>
                <OptionBar isCollapsed={this.state.isOptionBarCollapsed} />

                <Plot />
            </div>
        );
    }
}

Plotter.propTypes = {
    handleUnmount: React.PropTypes.func.isRequired,
    initialState: React.PropTypes.object.isRequired
};
