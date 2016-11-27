'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should } from 'chai';
import EquationBar from '../src/views/plotter/equations/EquationBar';
import OptionBar from '../src/views/plotter/options/OptionBar';

should();

const equations = [
    {
        value: 'cos(x)-sin(y)'
    }
];

describe('<EquationBar />', function () {
    it('should default to hidden', () => {
        const wrapper = shallow(<EquationBar isCollapsed equations={equations} />);
        wrapper.prop('className').indexOf('hide').should.equal(0);
        wrapper.prop('className').indexOf('show').should.equal(-1);
    });

    it('should change classes based on isCollapsed property', () => {
        const wrapper = shallow(<EquationBar isCollapsed={false} equations={equations} />);
        wrapper.prop('className').indexOf('hide').should.equal(-1);
        wrapper.prop('className').indexOf('show').should.equal(0);
    });

    it('should render one equation <div> for each equation in equations', () => {
        let wrapper = mount(<EquationBar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(1);

        equations.push({ value: 'sin(y)+x' });
        wrapper = mount(<EquationBar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(2);

        equations.unshift({ value: 'cos(x^2 + y^2)' });
        wrapper = mount(<EquationBar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(3);

        equations.pop();
        wrapper = mount(<EquationBar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(2);

        equations.shift();
        wrapper = mount(<EquationBar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(1);
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
