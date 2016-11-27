'use strict';

import React, { Component } from 'react';
// for some reason, mocha throws an error unless you import this path
// https://github.com/plotly/plotly.js/issues/891
import Plotly from 'plotly.js/dist/plotly.js';
import mathjs from 'mathjs';
import './plot.scss';

export default class Plot extends Component {
    constructor () {
        super();
        this.plot = this.plot.bind(this);
        this.process = this.process.bind(this);
    }

    componentDidMount () {
        // this.process(this.props.eq);
    }

    process (eq) {
        const max = 10;
        const min = -10;
        const span = max - min;
        const granularity = 10;
        const scope = {
            x: Array(granularity).fill(1).map((item, i) => {
                return (i / granularity * span) - 0.5 * (span);
            }),
            y: Array(granularity).fill(1).map((item, i) => {
                return (i / granularity * span) - 0.5 * (span);
            })
        };

        this.plot(eq, scope);
    }

    plot (eq, scope) {
        const z1 = [];
        for (let i = 0; i < scope.x.length; i++) {
            const row = [];
            for (let j = 0; j < scope.y.length; j++) {
                const pointScope = {
                    x: scope.x[i],
                    y: scope.y[j]
                };
                const value = mathjs.eval(eq, pointScope);
                row.push(value);
            }
            z1.push(row);
        }

        const z1Data = {
            x: scope.x,
            y: scope.y,
            z: z1,
            type: 'surface'
            // type: 'mesh3d'
        };

        const layout = {
            autosize: false,
            margin: {
                // defaults = b:80, l:80, r:80, t:100
                b: 200, l: 260, r: 260, t: 260
            },
            scene: {
                xaxis: {
                    type: 'linear',
                    range: [-10, 10]
                },
                yaxis: {
                    type: 'linear',
                    range: [-10, 10]
                },
                zaxis: {
                    type: 'linear',
                    range: [-10, 10]
                }
            }
        };
        Plotly.newPlot('plot', [z1Data], layout);
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
