'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import jsdom from 'mocha-jsdom';

describe('Application', function() {
    // give extra time for jsdom to iniatialize
    this.timeout(4000);
    jsdom();
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
})
