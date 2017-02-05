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

    // the plot mounts onto the div created in render, thus it must be called after render
    componentDidMount () {
        this.plot();
    }

    // only update if the new props are different from existing props
    shouldComponentUpdate (nextProps) {
        if (!shallowequal(nextProps, this.props)) {
            return true;
        }
        return false;
    }

    // updating the component doesn't change the rendered output, so you must update manually
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
            this.graph3d.setData(this.generateData(this.props));
        } else {
            this.options = this.formatOptions(this.props);
            this.data = this.generateData(this.props);
        }
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
            verticalRatio: 0.5,
            zMin: options.z[0],
            zMax: options.z[1],
            yCenter: '50%',
            xCenter: '50%'
        };

        return newOptions;
    }

    // takes an `options` object and composes a vis.DataSet
    generateData (options) {
        const xMin = options.x[0];
        const xMax = options.x[1];
        const yMin = options.y[0];
        const yMax = options.y[1];
        const granularity = 50; // number of datapoints will be granularity*granularity
        const eq = options.equation;
        // Create and populate a data table.
        const data = new vis.DataSet();
        // create some nice looking data with sin/cos
        let counter = 0;
        // const steps = granularity;  // number of datapoints will be steps*steps
        const xStep = (xMax - xMin) / granularity;
        const yStep = (yMax - yMin) / granularity;
        // const zStep = (zMax - zMin) / granularity;
        // compile once, evaluate for each point
        const compiledEQ = mathjs.compile(eq);
        for (let x = xMin; x < xMax; x += xStep) {
            for (let y = yMin; y < yMax; y += yStep) {
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
        this.graph3d = new vis.Graph3d(container, this.data, this.options);
    }

    render () {
        return (
            <div id='plot'
                className={['plot', 'push-body', this.props.isCollapsed ? 'collapsed' : 'expanded'].join(' ')} >
                loading
            </div>
        );
    }
}

Plot.propTypes = {
    x: React.PropTypes.array.isRequired,
    y: React.PropTypes.array.isRequired,
    plotWidth: React.PropTypes.string.isRequired,
    plotHeight: React.PropTypes.string.isRequired,
    isCollapsed: React.PropTypes.bool
};
