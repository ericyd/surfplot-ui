'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should } from 'chai';
import Plotter from '../../src/views/Plotter';

should();

describe('<Plotter />', function () {
    it('should initialize with the correct state', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.state('isCollapsed').should.equal(true);
    });

    it('should update state when toggle buttons are clicked', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        const buttons = wrapper.find('.toggleButton');

        buttons.at(0).simulate('click', { target: { name: buttons.at(0).prop('name') } });
        wrapper.state('isCollapsed').should.equal(false);
    });

    // TODO: this is going to be a challenging test because of the delayed updating
    // that is built into <ValidatedInput> elements
    xit('should save values when inputs are changed', () => {
        const wrapper = mount(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.find('.equation__input').at(0).simulate('change', { target: { id: 1, value: 'this' } });
        wrapper.find('.equation__input').at(0).prop('value').should.equal('this');
    });
});
