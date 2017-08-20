/**
 * App provides a container for the react router and loads those routes
 */

'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Container from './Container';
import Plotter from './views/Plotter';
import Article from './views/Article';

// TODO: Investigate active Link styling with IndexRoute setup
// I found that laying out my Routes in a way that matches the documentation,
// e.g. https://github.com/ericyd/surfplot-ui/blob/7820d1376822b2f6b284f173dac75b2808ff4a96/src/App.js
// the active styling for the Plotter component (IndexRoute) is always applied, even when visiting other
// routes. Ideally, visiting a page other than the IndexRoute would make Plotter lose the active styling
// and the visited component would have active styling.
export default function App (props) {
    return (
        <div className='App'>
            <Router history={hashHistory}>
                <Route path='/' component={Container}>
                    <IndexRoute component={Plotter} />
                </Route>
                <Route path='/about' component={Container}>
                    <IndexRoute component={Article} page='about' />
                </Route>
                <Route path='/credits' component={Container}>
                    <IndexRoute component={Article} page='credits' />
                </Route>
                <Route path='*' component={Container}>
                    <IndexRoute component={Article} page='notfound' />
                </Route>
            </Router>
        </div>
    );
}
