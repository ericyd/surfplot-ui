'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should } from 'chai';
import FunctionBar from '../src/views/plotter/functions/FunctionBar';
import OptionBar from '../src/views/plotter/options/OptionBar';

should();

const functions = [
    {
        value: 'cos(x)-sin(y)'
    }
];

describe('<FunctionBar />', function () {
    it('should default to hidden', () => {
        const wrapper = shallow(<FunctionBar isCollapsed functions={functions} />);
        wrapper.prop('className').indexOf('hide').should.equal(0);
        wrapper.prop('className').indexOf('show').should.equal(-1);
    });

    it('should change classes based on isCollapsed property', () => {
        const wrapper = shallow(<FunctionBar isCollapsed={false} functions={functions} />);
        wrapper.prop('className').indexOf('hide').should.equal(-1);
        wrapper.prop('className').indexOf('show').should.equal(0);
    });

    it('should render one function <div> for each function in functions', () => {
        let wrapper = mount(<FunctionBar isCollapsed={false} functions={functions} />);
        wrapper.find('.function').should.have.length(1);

        functions.push({ value: 'sin(y)+x' });
        wrapper = mount(<FunctionBar isCollapsed={false} functions={functions} />);
        wrapper.find('.function').should.have.length(2);

        functions.unshift({ value: 'cos(x^2 + y^2)' });
        wrapper = mount(<FunctionBar isCollapsed={false} functions={functions} />);
        wrapper.find('.function').should.have.length(3);

        functions.pop();
        wrapper = mount(<FunctionBar isCollapsed={false} functions={functions} />);
        wrapper.find('.function').should.have.length(2);

        functions.shift();
        wrapper = mount(<FunctionBar isCollapsed={false} functions={functions} />);
        wrapper.find('.function').should.have.length(1);
    });
});

describe('<OptionBar />', function () {
    it('should default to hidden', () => {
        const wrapper = shallow(<OptionBar isCollapsed />);
        wrapper.prop('className').indexOf('hide').should.equal(0);
        wrapper.prop('className').indexOf('show').should.equal(-1);
    });

    it('should change classes based on isCollapsed property', () => {
        const wrapper = shallow(<OptionBar isCollapsed={false} />);
        wrapper.prop('className').indexOf('hide').should.equal(-1);
        wrapper.prop('className').indexOf('show').should.equal(0);
    });
});
