'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { should } from 'chai';
import FunctionBar from '../src/views/plotter/FunctionBar';
import OptionBar from '../src/views/plotter/OptionBar';

should();

describe('<FunctionBar />', function () {
    it('should default to hidden', () => {
        const wrapper = shallow(<FunctionBar isCollapsed />);
        wrapper.prop('className').indexOf('hide').should.equal(0);
        wrapper.prop('className').indexOf('show').should.equal(-1);
    });

    it('should change classes based on isCollapsed property', () => {
        const wrapper = shallow(<FunctionBar isCollapsed={false} />);
        wrapper.prop('className').indexOf('hide').should.equal(-1);
        wrapper.prop('className').indexOf('show').should.equal(0);
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
