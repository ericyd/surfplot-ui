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
            ],
            options: {
                Axes: [
                    {
                        name: 'x',
                        type: 'range',
                        min: -10,
                        max: 10
                    },
                    {
                        name: 'y',
                        type: 'range',
                        min: -10,
                        max: 10
                    },
                    {
                        name: 'z',
                        type: 'range',
                        min: -10,
                        max: 10
                    }
                ],
                Style: [
                    {
                        name: 'Surface type',
                        type: 'select',
                        values: [
                            'surface',
                            'mesh'
                        ],
                        selected: 'surface'
                    }
                ],
                Plot: [
                    {
                        name: 'width',
                        type: 'select',
                        values: [
                            'auto',
                            '100%',
                            '50%'
                        ],
                        selected: 'auto'
                    },
                    {
                        name: 'height',
                        type: 'select',
                        values: [
                            'auto',
                            '100%',
                            '80%',
                            '50%'
                        ],
                        selected: '80%'
                    }
                ]
            }
        };

        this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
        this.addEquation = this.addEquation.bind(this);
        this.handleEQChange = this.handleEQChange.bind(this);
        this.handleEQDelete = this.handleEQDelete.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
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
        const ids = equations.map((value) => {
            return value.id;
        });
        equations.push({ id: Math.max(...ids) + 1, value: '' });
        this.setState({
            equations: equations
        });
    }

    handleOptionChange (parent, idx, key, value) {
        const options = this.state.options;
        options[parent][idx][key] = value;
        this.setState({ options: options });
    }

    handleEQChange (id, value) {
        const equations = this.state.equations;
        const newEquations = equations.map((eq) => {
            if (eq.id === id) {
                eq.value = value;
                return eq;
            }
            return eq;
        });
        this.setState({ equations: newEquations });
    }

    handleEQDelete (id) {
        if (this.state.equations.length === 1) {
            console.log('Must have at least one function');
            return;
        }
        const equations = this.state.equations;
        const newEquations = equations.filter((eq) => {
            if (eq.id !== id) return eq;
        });
        this.setState({ equations: newEquations });
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
                    handleEQChange={this.handleEQChange}
                    handleEQDelete={this.handleEQDelete}
                    />

                <button type='button'
                    name='optionBarToggle'
                    onClick={this.handleSidebarToggle}
                    className='toggleButton right'>
                    Toggle the OptionBar
                </button>
                <OptionBar isCollapsed={this.state.isOptionBarCollapsed}
                    options={this.state.options}
                    handleChange={this.handleOptionChange} />

                <Plot eq={this.state.equations[0].value}
                    options={this.state.options} />
            </div>
        );
    }
}

Plotter.propTypes = {
    handleUnmount: React.PropTypes.func.isRequired,
    initialState: React.PropTypes.object.isRequired
};
