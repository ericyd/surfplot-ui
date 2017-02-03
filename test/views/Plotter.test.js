'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { should } from 'chai';
import Plotter from '../../src/views/Plotter';
import ToggleSidebarBtn from '../../src/components/ToggleSidebarBtn';

should();

describe('<Plotter />', function () {
    this.timeout(4000);

    it('should initialize with the correct state', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.state('isCollapsed').should.equal(true);
    });

    it('should update state when toggle buttons are clicked', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        const buttons = wrapper.find(ToggleSidebarBtn);

        buttons.at(0).simulate('click', { target: { name: buttons.at(0).prop('name') } });
        wrapper.state('isCollapsed').should.equal(false);
    });

    // TODO: Determine how to write this test
    // currently, it seems to be failing because it needs mount() called, not shallow().
    // however, there is an issue with vis.js where calling mount() on Plotter throws an error
    xit('should save values when inputs are changed', function (done) {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.find('.validated__range').at(0).simulate('change', { target: { id: 1, value: '17' } });
        wrapper.find('.validated__range').at(1).simulate('change', { target: { id: 1, value: '-17' } });
        setTimeout(function () {
            wrapper.state('x').should.equal('cos(x)');
            console.log(wrapper.state());
            done();
        }, 3000);
    });
});
