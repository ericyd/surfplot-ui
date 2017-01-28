/*eslint no-unused-vars: "off"*/
'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should, expect } from 'chai';
import App from '../src/App';
import Container from '../src/Container';
import Plotter from '../src/views/Plotter';
import About from '../src/views/About';
import Credits from '../src/views/Credits';

should();

// TODO: Write tests to verify that the props are being passed and saved to the child components correctly
xdescribe('<Container />', function () {
    it('should render a default view of "Plotter"', () => {
        const wrapper = shallow(<Container />);
        wrapper.containsMatchingElement(<Plotter />).should.equal(true);
    });

    it('should render different views when props.view changes', () => {
        const wrapper = shallow(<Container />);
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
        appWrapper.containsMatchingElement(<Plotter />).should.equal(true);

        navWrapper.childAt(1).simulate('click');
        appWrapper.state('view').should.equal('About');
        appWrapper.contains(<About />).should.equal(true);

        navWrapper.childAt(2).simulate('click');
        appWrapper.state('view').should.equal('Credits');
        appWrapper.contains(<Credits />).should.equal(true);
    });

    it('should update state when <Plotter /> unmounts', () => {
        const viewWrapper = mount(<Container />);
        expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(undefined);
        viewWrapper.setProps({ view: 'About' });
        expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(true);
        viewWrapper.setProps({ view: 'Credits' });
        expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(true);
    });

    it('should match the Plotter state when it unmounts', () => {
        const viewWrapper = mount(<Container />);
        let equationBarButton = viewWrapper.find('[name="equationBarToggle"]');
        let optionBarButton = viewWrapper.find('[name="optionBarToggle"]');

        equationBarButton.simulate('click');
        viewWrapper.setProps({ view: 'About' });
        expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(false);
        expect(viewWrapper.state('isOptionBarCollapsed')).to.equal(true);

        viewWrapper.setProps({ view: 'Plotter' });
        optionBarButton = viewWrapper.find('[name="optionBarToggle"]');
        optionBarButton.simulate('click');
        viewWrapper.setProps({ view: 'Credits' });
        expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(false);
        expect(viewWrapper.state('isOptionBarCollapsed')).to.equal(false);

        viewWrapper.setProps({ view: 'Plotter' });
        equationBarButton = viewWrapper.find('[name="equationBarToggle"]');
        optionBarButton = viewWrapper.find('[name="optionBarToggle"]');
        equationBarButton.simulate('click');
        optionBarButton.simulate('click');
        viewWrapper.setProps({ view: 'Credits' });
        expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(true);
        expect(viewWrapper.state('isOptionBarCollapsed')).to.equal(true);
    });
});
