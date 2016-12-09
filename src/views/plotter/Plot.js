'use strict';

import React, { Component } from 'react';
import vis from 'vis';
import mathjs from 'mathjs';
import shallowequal from 'shallowequal';
import './plot.scss';

export default class Plot extends Component {
    constructor () {
        super();
        this.plot = this.plot.bind(this);
        this.formatOptions = this.formatOptions.bind(this);
        this.generateData = this.generateData.bind(this);
        this.updatePlotData = this.updatePlotData.bind(this);
    }

    componentWillMount () {
        this.updatePlotData();
    }

    componentDidMount () {
        this.plot();
    }

    shouldComponentUpdate (nextProps) {
        // console.log(`shouldPlotUpdate = ${nextProps.eq !== this.props.eq}, ` +
        //     `new EQ: ${nextProps.eq}, old EQ: ${this.props.eq}`);
        console.log('will update', !shallowequal(nextProps, this.props));
        if (!shallowequal(nextProps, this.props)) {
            return true;
        }
        return false;
    }

    componentDidUpdate () {
        this.updatePlotData();
    }

    /**
     * If graph3d exists, update it directly.
     * Otherwise, set properties and the graph will fetch the data in plot()
     */
    updatePlotData () {
        if (this.graph3d !== undefined) {
            this.graph3d.setOptions(this.formatOptions(this.props));
            this.graph3d.setData(this.generateData(this.props.eq));
        } else {
            this.options = this.formatOptions(this.props);
            this.data = this.generateData(this.props.eq);
        }
        console.log('graph3d updated', this.graph3d !== undefined);
    }

    // takes an `options` object and turns it into a format accepted by vis.Graph3d
    formatOptions (options) {
        const newOptions = {
            width: options.plotWidth,
            height: options.plotHeight,
            style: options.surfaceType,
            showPerspective: true,
            showGrid: true,
            showShadow: false,
            keepAspectRatio: true,
            verticalRatio: 0.5
        };

        return newOptions;
    }

    generateData (eq) {
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

    plot () {
        // Instantiate our graph object.
        const container = document.getElementById('plot');
        /*eslint no-unused-vars: "off" */
        this.graph3d = new vis.Graph3d(container, this.data, this.options);
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
