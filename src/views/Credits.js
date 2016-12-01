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
                <li><a href='http://visjs.org/' target='_blank'>vis.js</a>: This is basically the entire reason the application exists,
                 so thanks folks at Vis.js</li>
                <li><a href='http://mathjs.org/' target='_blank'>math.js</a>: Handles all the math formula parsing.</li>
                <li><a href='https://facebook.github.io/react/' target='_blank'>React</a>: UI framework</li>
                <li><a href='https://babeljs.io/' target='_blank'>Babel</a>
                    , <a href='https://webpack.github.io/' target='_blank'>Webpack</a>
                    : Build tools
                </li>
                <li><a href='http://eslint.org/' target='_blank'>ESlint</a>
                    , <a href='http://stylelint.io/' target='_blank'>Stylelint</a>
                    : Style linting for JS and SCSS
                </li>
                <li><a href='https://mochajs.org/' target='_blank'>Mocha</a>
                    , <a href='http://airbnb.io/enzyme/' target='_blank'>Enzyme</a>
                    , <a href='http://chaijs.com/' target='_blank'>Chai</a>
                    : Testing
                </li>
            </ol>
        </main>
    );
}
