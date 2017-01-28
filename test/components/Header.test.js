'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { should } from 'chai';
import Header from '../../src/header/Header';
import Nav from '../../src/header/Nav';

should();

describe('<Header />', function () {
    it('should contain a logo', () => {
        const wrapper = shallow(<Header />);
        wrapper.contains(<img src='img/open_surface.svg' className='header__logo' alt='Surf Plot JS logo' />)
            .should.equal(true);
        wrapper.find('img.header__logo').should.have.length(1);
    });

    it('should contain a <Nav />', () => {
        const wrapper = shallow(<Header />);
        wrapper.containsMatchingElement(<Nav />).should.equal(true);
    });
});
