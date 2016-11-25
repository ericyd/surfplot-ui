/*eslint no-unused-vars: "off"*/
'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should } from 'chai';
import App from '../src/App';
import ViewContainer from '../src/views/ViewContainer';
import Plotter from '../src/views/plotter/Plotter';
import About from '../src/views/About';
import Credits from '../src/views/Credits';

should();

describe('<ViewContainer />', function () {
    it('should render a default view of "Plotter"', () => {
        const wrapper = shallow(<ViewContainer />);
        wrapper.contains(<Plotter />).should.equal(true);
    });

    it('should render different views when props.view changes', () => {
        const wrapper = shallow(<ViewContainer />);
        wrapper.setProps({ view: 'About' });
        wrapper.contains(<About />).should.equal(true);

        wrapper.setProps({ view: 'Credits' });
        wrapper.contains(<Credits />).should.equal(true);
    });

    it('should change views when <Nav /> buttons are clicked', () => {
        const appWrapper = mount(<App />);
        const navWrapper = appWrapper.find('nav.nav');

        navWrapper.childAt(0).simulate('click');
        appWrapper.state('view').should.equal('Plotter');
        appWrapper.contains(<Plotter />).should.equal(true);

        navWrapper.childAt(1).simulate('click');
        appWrapper.state('view').should.equal('About');
        appWrapper.contains(<About />).should.equal(true);

        navWrapper.childAt(2).simulate('click');
        appWrapper.state('view').should.equal('Credits');
        appWrapper.contains(<Credits />).should.equal(true);
    });
});
