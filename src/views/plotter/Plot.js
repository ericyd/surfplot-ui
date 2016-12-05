'use strict';

import React, { Component } from 'react';
import vis from 'vis';
import mathjs from 'mathjs';
import './plot.scss';

export default class Plot extends Component {
    constructor () {
        super();
        this.state = {};
        this.plot = this.plot.bind(this);
        this.formatOptions = this.formatOptions.bind(this);
    }

    componentWillMount () {
        const options = this.formatOptions(this.props.options);
        const data = this.generateData();
        this.setState({ 
            options: options,
            data: data 
        });
    }

    componentDidMount () {
        this.plot(this.props.eq);
    }

    shouldComponentUpdate (nextProps) {
        console.log(`shouldPlotUpdate = ${nextProps.eq !== this.props.eq}, ` +
            `new EQ: ${nextProps.eq}, old EQ: ${this.props.eq}`);
        if (nextProps.eq !== this.props.eq) {
            return true;
        }
        return false;
    }

    componentDidUpdate () {
        this.plot(this.props.eq);
    }

    // takes an `options` object and turns it into a format accepted by vis.Graph3d
    formatOptions (options) {
        const newOptions = {
            width: options.Plot[0].selected,
            height: options.Plot[1].selected,
            style: options.Style[0].selected,
            showPerspective: true,
            showGrid: true,
            showShadow: false,
            keepAspectRatio: true,
            verticalRatio: 0.5
        };

        return newOptions;
    }

    generateData () {
        // Create and populate a data table.
        const data = new vis.DataSet();
        // create some nice looking data with sin/cos
        let counter = 0;
        const steps = 50;  // number of datapoints will be steps*steps
        const axisMax = 10;
        const axisStep = axisMax / steps;
        // compile once, evaluate for each point
        const compiledEQ = mathjs.compile(eq);
        for (let x = 0; x < axisMax; x += axisStep) {
            for (let y = 0; y < axisMax; y += axisStep) {
                const value = compiledEQ.eval({ x: x, y: y });
                data.add({
                    id: counter++,
                    x: x,
                    y: y,
                    z: value,
                    style: value
                });
            }
        }
        return data;
    }

    plot (eq) {
        // Instantiate our graph object.
        const container = document.getElementById('plot');
        /*eslint no-unused-vars: "off" */
        const graph3d = new vis.Graph3d(container, this.state.data, this.state.options);
    }

    render () {
        return (
            <div className='plot' id='plot' />
        );
    }
}

Plot.propTypes = {
    eq: React.PropTypes.string.isRequired
};
