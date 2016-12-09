'use strict';

import React, { Component } from 'react';
// import EquationBar from './equations/EquationBar';
// import OptionBar from './options/OptionBar';
import Sidebar from './Sidebar';
import Plot from './Plot';
import './plotter.scss';

export default class Plotter extends Component {
    constructor () {
        super();

        // state contains only the data that will be changing
        // a more complete data structure for options is held in this.groups
        this.state = {
            isEquationBarCollapsed: true,
            isOptionBarCollapsed: true,
            equations: [
                {
                    id: 1,
                    name: 'z' + this.id,
                    value: 'cos(x)-sin(y)'
                }
            ],
            // all default values for options are declared here
            x: [-5, 5],
            y: [-5, 5],
            z: [-5, 5],
            surfaceType: 'surface',
            plotWidth: '80%',
            plotHeight: '80%'
        };

        // Will be initialized when componentWillMount
        this.groups = {};

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
        this.groups = getGroups(this.state);
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

    handleOptionChange (key, value) {
        const newOption = {};
        newOption[key] = value;
        this.setState(newOption);
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

                <Sidebar
                    isCollapsed={this.state.isEquationBarCollapsed}
                    groups={{ equations: { items: this.state.equations } }}
                    handleItemAdd={this.addEquation}
                    handleItemChange={this.handleEQChange}
                    handleItemDelete={this.handleEQDelete}
                    side='left' />

                <button type='button'
                    name='optionBarToggle'
                    onClick={this.handleSidebarToggle}
                    className='toggleButton right'>
                    Toggle the OptionBar
                </button>

                <Sidebar
                    isCollapsed={this.state.isOptionBarCollapsed}
                    groups={this.groups}
                    handleItemChange={this.handleOptionChange}
                    side='right' />

                <Plot eq={this.state.equations[0].value}
                    {...this.state} />
            </div>
        );
    }
    // <EquationBar
    // isCollapsed={this.state.isEquationBarCollapsed}
    // equations={this.state.equations}
    // addEquation={this.addEquation}
    // handleEQChange={this.handleEQChange}
    // handleEQDelete={this.handleEQDelete}
    // />

    // <OptionBar isCollapsed={this.state.isOptionBarCollapsed}
    // groups={this.groups}
    // options={this.state.options}
    // handleChange={this.handleOptionChange} />

}

Plotter.propTypes = {
    handleUnmount: React.PropTypes.func.isRequired,
    initialState: React.PropTypes.object.isRequired
};
