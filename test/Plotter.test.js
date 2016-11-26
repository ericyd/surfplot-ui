'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { should } from 'chai';
import Plotter from '../src/views/plotter/Plotter';

should();

describe('<Plotter />', function () {
    it('should initialize with the correct state', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.state('isFunctionBarCollapsed').should.equal(true);
        wrapper.state('isOptionBarCollapsed').should.equal(true);
    });

    it('should update state when toggle buttons are clicked', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        const buttons = wrapper.find('.toggleButton');

        buttons.at(0).simulate('click', { target: { name: buttons.at(0).prop('name') } });
        wrapper.state('isFunctionBarCollapsed').should.equal(false);

        buttons.at(1).simulate('click', { target: { name: buttons.at(1).prop('name') } });
        wrapper.state('isOptionBarCollapsed').should.equal(false);

        buttons.at(0).simulate('click', { target: { name: buttons.at(0).prop('name') } });
        buttons.at(1).simulate('click', { target: { name: buttons.at(1).prop('name') } });
        wrapper.state('isFunctionBarCollapsed').should.equal(true);
        wrapper.state('isOptionBarCollapsed').should.equal(true);
    });
});
