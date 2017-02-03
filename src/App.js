/**
 * App provides a container for the react router and loads those routes
 */

'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Container from './Container';
import Plotter from './views/Plotter';
// import About from './views/About';
// import Credits from './views/Credits';
import Article from './views/Article';
import NotFound from './views/404';

export default function App (props) {
    return (
        <div className='App'>
            <Router history={hashHistory}>
                <Route path='/' component={Container}>
                    <IndexRoute component={Plotter} />
                    <Route path='/about' component={Article} page='about' />
                    <Route path='/credits' component={Article} page='credits' />
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        </div>
    );
}
