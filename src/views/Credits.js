'use strict';

import React from 'react';
import './text-doc.scss';

export default function Credits () {
    return (
        <main className='doc'>
            <h1>Credits</h1>

            <h2>Inspiration</h2>

            This was fully inspired by <a href='http://web.monroecc.edu/manila/webfiles/pseeburger/CalcPlot3D/' target='_blank'>Calc Plot 3D</a>.
            Indeed, the primary goal of this app is to emulate the functionality of Calc Plot 3D using a fully
            JavaScript implementation for the UI and plotting tools.

            <h2>Getting started</h2>

            <ol>
                <li><a href='https://www.npmjs.com/package/create-react-app' target='_blank'>create-react-app</a></li>
                <li><a href='https://github.com/verekia/js-stack-from-scratch' target='_blank'>js-stack-from-scratch</a></li>
                <li><a href='https://facebook.github.io/react/docs/hello-world.html' target='_blank'>React Docs</a>: These are seriously
                 helpful. If you haven't read them, I would recommend it</li>
                <li>Of course, <a href='http://stackoverflow.com/' target='_blank'>stack overflow</a></li>
            </ol>

            <h2>Essential packages</h2>

            <ol>
                <li><a href='https://plot.ly/javascript/' target='_blank'>plotly.js</a>: This is basically the entire reason the application exists,
                 so thanks folks at Plotly</li>
                <li><a href='http://mathjs.org/' target='_blank'>math.js</a>: Handles all the math formula parsing.</li>
                <li><a href='https://facebook.github.io/react/' target='_blank'>React</a>
                , <a href='https://babeljs.io/' target='_blank'>babel</a>
                , <a href='http://eslint.org/' target='_blank'>eslint</a>
                , <a href='https://mochajs.org/' target='_blank'>mocha</a>
                , <a href='https://webpack.github.io/' target='_blank'>webpack</a>
                , <a href='http://stylelint.io/' target='_blank'>stylelint</a>
                : basically, everything else in the app</li>
            </ol>
        </main>
    );
}
