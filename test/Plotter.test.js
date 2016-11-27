'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should } from 'chai';
import Plotter from '../src/views/plotter/Plotter';

should();

describe('<Plotter />', function () {
    it('should initialize with the correct state', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.state('isEquationBarCollapsed').should.equal(true);
        wrapper.state('isOptionBarCollapsed').should.equal(true);
    });

    it('should update state when toggle buttons are clicked', () => {
        const wrapper = shallow(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        const buttons = wrapper.find('.toggleButton');

        buttons.at(0).simulate('click', { target: { name: buttons.at(0).prop('name') } });
        wrapper.state('isEquationBarCollapsed').should.equal(false);

        buttons.at(1).simulate('click', { target: { name: buttons.at(1).prop('name') } });
        wrapper.state('isOptionBarCollapsed').should.equal(false);

        buttons.at(0).simulate('click', { target: { name: buttons.at(0).prop('name') } });
        buttons.at(1).simulate('click', { target: { name: buttons.at(1).prop('name') } });
        wrapper.state('isEquationBarCollapsed').should.equal(true);
        wrapper.state('isOptionBarCollapsed').should.equal(true);
    });

    it('should always have at least one equation', () => {
        const wrapper = mount(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.find('.equation__delete').at(0).simulate('click');
        wrapper.find('.equation').should.have.length(1);
    });

    it('should add equations when the `+` button is clicked', () => {
        const wrapper = mount(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.find('.equation').should.have.length(1);
        wrapper.find('.addEquation').at(0).simulate('click');
        wrapper.find('.equation').should.have.length(2);
        wrapper.find('.addEquation').at(0).simulate('click');
        wrapper.find('.addEquation').at(0).simulate('click');
        wrapper.find('.equation').should.have.length(4);
    });

    it('should save values when equation inputs are changed', () => {
        const wrapper = mount(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.find('.equation__input').at(0).simulate('change', { target: { id: 1, value: 'this' } });
        wrapper.find('.equation__input').at(0).prop('value').should.equal('this');
    });

    it('should should be able to remove equations with the `-` button', () => {
        const wrapper = mount(<Plotter handleUnmount={(e) => e} initialState={{}} />);
        wrapper.find('.addEquation').at(0).simulate('click'); // 2
        wrapper.find('.addEquation').at(0).simulate('click'); // 3
        wrapper.find('.equation__delete').at(0).simulate('click'); // 2
        wrapper.find('.equation').should.have.length(2);
        wrapper.find('.equation__delete').at(0).simulate('click'); // 1
        wrapper.find('.equation').should.have.length(1);
    });
});
