'use strict';

import React from 'react';
import { render, shallow } from 'enzyme';
import { should } from 'chai';
import Nav from '../../src/header/Nav';

should();

describe('<Nav />', function () {
    it('renders without crashing', () => {
        const wrapper = render(<Nav />);
        wrapper.find('nav').get(0).attribs.class.should.equal('nav');
    });

    it('should have three buttons', () => {
        const wrapper = render(<Nav />);
        wrapper.find('a').should.have.length(3);
    });

    it('should have buttons with correct labels', () => {
        const wrapper = render(<Nav />);
        const buttons = wrapper.find('a');

        buttons.get(0).attribs.name.should.equal('Plotter');
        buttons.get(1).attribs.name.should.equal('About');
        buttons.get(2).attribs.name.should.equal('Credits');
        // no state has been passed, so none will be --active
        buttons.get(0).attribs.class.should.equal('nav__btn');
        buttons.get(1).attribs.class.should.equal('nav__btn');
        buttons.get(2).attribs.class.should.equal('nav__btn');
    });

    /**
     * This test will need to be refactored to consider react-router and the fact that the
     * links are simple 'a' elements instead of buttons.  For now, skipping...
     */
    xit('should change the button classes when props.view changes', () => {
        const wrapper = shallow(<Nav />);

        /*
        must use JSX-speak to reference className with `shallow()` instead of
        using attribs with `render()`.

        Also, must re-find buttons after setting props in order for classes
        to be applied correctly
        */

        let buttons = wrapper.find('a');
        buttons.get(0).props.className.should.not.equal('nav__btn--active');
        buttons.get(1).props.className.should.not.equal('nav__btn--active');
        buttons.get(2).props.className.should.not.equal('nav__btn--active');

        wrapper.setProps({ view: 'Plotter' });
        buttons = wrapper.find('a');
        buttons.get(0).props.className.should.not.equal('nav__btn');
        buttons.get(0).props.className.should.equal('nav__btn--active');
        buttons.get(1).props.className.should.equal('nav__btn');
        buttons.get(2).props.className.should.equal('nav__btn');

        wrapper.setProps({ view: 'About' });
        buttons = wrapper.find('a');
        buttons.get(1).props.className.should.not.equal('nav__btn');
        buttons.get(1).props.className.should.equal('nav__btn--active');
        buttons.get(0).props.className.should.equal('nav__btn');
        buttons.get(2).props.className.should.equal('nav__btn');

        wrapper.setProps({ view: 'Credits' });
        buttons = wrapper.find('a');
        buttons.get(2).props.className.should.not.equal('nav__btn');
        buttons.get(2).props.className.should.equal('nav__btn--active');
        buttons.get(0).props.className.should.equal('nav__btn');
        buttons.get(1).props.className.should.equal('nav__btn');
    });
});
