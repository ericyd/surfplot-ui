'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should } from 'chai';
import Sidebar from '../../src/components/Sidebar';

should();

const equations = [
    {
        value: 'cos(x)-sin(y)'
    }
];

describe('<Sidebar />', function () {
    it('should default to hidden', () => {
        const wrapper = shallow(<Sidebar isCollapsed equations={equations} />);
        wrapper.prop('className').indexOf('hide').should.equal(0);
        wrapper.prop('className').indexOf('show').should.equal(-1);
    });

    it('should change classes based on isCollapsed property', () => {
        const wrapper = shallow(<Sidebar isCollapsed={false} equations={equations} />);
        wrapper.prop('className').indexOf('hide').should.equal(-1);
        wrapper.prop('className').indexOf('show').should.equal(0);
    });

    it('should render one equation <div> for each equation in equations', () => {
        let wrapper = mount(<Sidebar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(1);

        equations.push({ value: 'sin(y)+x' });
        wrapper = mount(<Sidebar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(2);

        equations.unshift({ value: 'cos(x^2 + y^2)' });
        wrapper = mount(<Sidebar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(3);

        equations.pop();
        wrapper = mount(<Sidebar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(2);

        equations.shift();
        wrapper = mount(<Sidebar isCollapsed={false} equations={equations} />);
        wrapper.find('.equation').should.have.length(1);
    });
});

describe('<Sidebar />', function () {
    it('should default to hidden', () => {
        const wrapper = shallow(<Sidebar isCollapsed />);
        wrapper.prop('className').indexOf('hide').should.equal(0);
        wrapper.prop('className').indexOf('show').should.equal(-1);
    });

    it('should change classes based on isCollapsed property', () => {
        const wrapper = shallow(<Sidebar isCollapsed={false} />);
        wrapper.prop('className').indexOf('hide').should.equal(-1);
        wrapper.prop('className').indexOf('show').should.equal(0);
    });
});
