'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, render, shallow } from 'enzyme';
import { should } from 'chai';
import App from '../src/App';

should();

describe('<App />', function() {
    
    it('renders without crashing', () => {
        const wrapper = mount(<App />);
        wrapper.state('view').should.equal('Plotter');
    });
})
