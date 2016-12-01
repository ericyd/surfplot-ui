'use strict';

import React, { Component } from 'react';
import vis from 'vis';
import mathjs from 'mathjs';
import './plot.scss';

export default class Plot extends Component {
    constructor () {
        super();
        this.plot = this.plot.bind(this);
        this.process = this.process.bind(this);
    }

    componentDidMount () {
        this.process(this.props.eq);
    }

    process (eq) {
        this.plot(eq);
    }

    plot (eq) {
        // Create and populate a data table.
        var data = new vis.DataSet();
        // create some nice looking data with sin/cos
        var counter = 0;
        var steps = 50;  // number of datapoints will be steps*steps
        var axisMax = 10;
        var axisStep = axisMax / steps;
        for (var x = 0; x < axisMax; x += axisStep) {
            for (var y = 0; y < axisMax; y += axisStep) {
                var value = mathjs.eval(eq, { x: x, y: y });
                data.add({
                    id: counter++,
                    x: x,
                    y: y,
                    z: value,
                    style: value
                });
            }
        }

        // specify options
        var options = {
            width: '500px',
            height: '552px',
            style: 'surface',
            showPerspective: true,
            showGrid: true,
            showShadow: false,
            keepAspectRatio: true,
            verticalRatio: 0.5
        };

        // Instantiate our graph object.
        var container = document.getElementById('plot');
        /*eslint no-unused-vars: "off" */
        var graph3d = new vis.Graph3d(container, data, options);
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
