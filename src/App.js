'use strict';

import React, { Component } from 'react';
import Header from './header/Header';
import ViewContainer from './views/ViewContainer';


class App extends Component {
    constructor () {
        super();

        this.state = {
            view: 'Plotter',
            test: 'testing'
        };

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange (view) {
        this.setState({
            view: view
        });
    }

    render () {
        return (
            <div className='App'>
                <Header handleViewChange={this.handleViewChange}
                    view={this.state.view} />
                <ViewContainer view={this.state.view} />
            </div>
        );
    }
}

export default App;
