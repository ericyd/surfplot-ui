'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { should } from 'chai';
import Sidebar from '../../src/components/Sidebar';
import Plotter from '../../src/views/Plotter';
import getGroups from '../../src/utilities/getGroups';
import ValidatedInput from '../../src/components/ValidatedInput';
import DirectInput from '../../src/components/DirectInput';

should();

const groups = getGroups();

describe('<Sidebar />', function () {
    it('should default to hidden', () => {
        const wrapper = shallow(<Sidebar
            isCollapsed
            groups={groups}
            side='left' />);
        wrapper.prop('className').indexOf('hide').should.equal(0);
        wrapper.prop('className').indexOf('show').should.equal(-1);
    });

    it('should change classes based on isCollapsed property', () => {
        const wrapper = shallow(<Sidebar
            isCollapsed={false}
            groups={groups}
            side='left' />);
        wrapper.prop('className').indexOf('hide').should.equal(-1);
        wrapper.prop('className').indexOf('show').should.equal(0);
    });

    it('should render the correct number of <ValidatedInput> and <DirectInput>', () => {
        // get count of validated and direct inputs for comparison
        let numValidatedInputs = 0;
        let numDirectInputs = 0;
        Object.keys(groups).forEach((groupName, i) => {
            for (let i = 0; i < groups[groupName].items.length; i++) {
                let item = groups[groupName].items[i];
                if (item.isValidated) {
                    numValidatedInputs++;
                } else {
                    numDirectInputs++;
                }
            }
        });

        // render Sidebar with all groups and state values
        const plotter = new Plotter();
        let wrapper = mount(<Sidebar
            isCollapsed
            groups={groups}
            {...plotter.state}
            side='left' />);

        // find validated and direct inputs and compare to number counted from getGroups
        wrapper.find(ValidatedInput).should.have.length(numValidatedInputs);
        wrapper.find(DirectInput).should.have.length(numDirectInputs);
    });
});