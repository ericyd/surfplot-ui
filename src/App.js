'use strict';

import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Container from './views/Container';
import Plotter from './views/Plotter';
import About from './views/About';
import Credits from './views/Credits';
import NotFound from './views/404';

class App extends Component {
    constructor () {
        super();
        this.state = { test: 'true' };
        this.handlePlotterUnmount = this.handlePlotterUnmount.bind(this);
    }

    componentWillUpdate () {
        console.log(this.state);
    }

    handlePlotterUnmount (state) {
        this.setState(state);
    }


    render () {
        return (
            <div className='App'>
                <Router history={hashHistory}>
                    <Route path='/' component={Container}>
                        <IndexRoute component={Plotter}
                            handleUnmount={this.handlePlotterUnmount}
                            initialState={this.state} />
                        <Route path='/about' component={About} />
                        <Route path='/credits' component={Credits} />
                        <Route path='*' component={NotFound} />
                    </Route>
                </Router>
            </div>
        );
    }
}

export default App;
