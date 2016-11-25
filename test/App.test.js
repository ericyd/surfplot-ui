'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import { mount, render, shallow } from 'enzyme';
import { should } from 'chai';

should();

describe('<App />', function() {
    
    it('renders without crashing', () => {
        const wrapper = mount(<App />);
        wrapper.state('view').should.equal('Plotter');
    });
})
