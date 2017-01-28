/*eslint no-unused-vars: "off"*/
'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should, expect } from 'chai';
import App from '../src/App';
import Container from '../src/Container';
import Plotter from '../src/views/Plotter';
import Article from '../src/views/Article';

should();

// These tests are important, but challenging to write due to the use of react-router
// At this point I'm really not sure how to write these tests correctly.
// More research is needed to determine how to programmatically change the route for testing purposes.
// TODO: Write tests to verify that the props are being passed and saved to the child components correctly
xdescribe('<Container />', function () {
    it('should render a default view of "Plotter"', () => {
        const wrapper = shallow(<App />);
        const container = wrapper.childAt(0).render();
        container.contains(Plotter).should.equal(true);
    });

    it('should render different articles based on the page property', () => {
        // This test fails because the markdown isn't rendered properly, and the text parser fails
        const wrapper = shallow(<Container><Article route={{ page: 'about' }}/></Container>);
        let article = wrapper.find(Article);
        article.text().should.equal('# About');
    });

    it('should update state when <Plotter /> unmounts', () => {
        // const viewWrapper = mount(<Container />);
        // expect(viewWrapper.state('isSidebarCollapsed')).to.equal(undefined);
        // const plotter = viewWrapper.find(Plotter);
        // plotter.unmount();
        // expect(viewWrapper.state('isSidebarCollapsed')).to.equal(false);
    });

    xit('should match the Plotter state when it unmounts', () => {
        // const viewWrapper = mount(<Container />);
        // let equationBarButton = viewWrapper.find('[name="equationBarToggle"]');
        // let optionBarButton = viewWrapper.find('[name="optionBarToggle"]');

        // equationBarButton.simulate('click');
        // viewWrapper.setProps({ view: 'About' });
        // expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(false);
        // expect(viewWrapper.state('isOptionBarCollapsed')).to.equal(true);

        // viewWrapper.setProps({ view: 'Plotter' });
        // optionBarButton = viewWrapper.find('[name="optionBarToggle"]');
        // optionBarButton.simulate('click');
        // viewWrapper.setProps({ view: 'Credits' });
        // expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(false);
        // expect(viewWrapper.state('isOptionBarCollapsed')).to.equal(false);

        // viewWrapper.setProps({ view: 'Plotter' });
        // equationBarButton = viewWrapper.find('[name="equationBarToggle"]');
        // optionBarButton = viewWrapper.find('[name="optionBarToggle"]');
        // equationBarButton.simulate('click');
        // optionBarButton.simulate('click');
        // viewWrapper.setProps({ view: 'Credits' });
        // expect(viewWrapper.state('isEquationBarCollapsed')).to.equal(true);
        // expect(viewWrapper.state('isOptionBarCollapsed')).to.equal(true);
    });
});
