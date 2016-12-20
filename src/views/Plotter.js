'use strict';

import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from '../components/Plot';
import getGroups from '../utilities/getGroups';
import './plotter.scss';

export default class Plotter extends Component {
    constructor () {
        super();

        // state contains only the data that will be changing
        // a more complete data structure for options is held in this.groups
        this.state = {
            isCollapsed: true,
            equation: 'cos(x)-sin(y)',
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
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    componentWillMount () {
        // console.log(props.route);
        // this.props.route.handleMount();
        // if this.props.route.initialState is not empty, set as original state
        const init = this.props.route.initialState;
        console.log(this.props.route.initialState);
        if (init !== undefined && Object.keys(init).length !== 0 && init.constructor === Object) {
            this.setState(init);
        }
        this.groups = getGroups();
    }

    componentWillUnmount () {
        // save the state in the parent before it unmounts so it is still here when it returns
        this.props.route.handleUnmount(this.state);
    }

    handleSidebarToggle () {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    handleItemChange (key, value) {
        const newOption = {};
        newOption[key] = value;
        this.setState(newOption);
    }

    render () {
        return (
            <div className='plotter'>
                <button type='button'
                    name='sidebarToggle'
                    onClick={this.handleSidebarToggle}
                    className='toggleButton left'>
                    Toggle the Sidebar
                </button>

                <Sidebar
                    isCollapsed={this.state.isCollapsed}
                    groups={this.groups}
                    handleItemChange={this.handleItemChange}
                    {...this.state}
                    side='left' />

                <Plot {...this.state} />
            </div>
        );
    }
}

// Plotter.propTypes = {
//     route: {
//         handleUnmount: React.PropTypes.func,
//         initialState: React.PropTypes.object
//     }
// };
