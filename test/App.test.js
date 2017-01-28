'use strict';

import React from 'react';
import { shallow, render } from 'enzyme';
import { should } from 'chai';
import App from '../src/App';

should();

describe('<App />', function () {
    it('renders without crashing', () => {
        // not sure why mount(<App />) fails. It throws an error regarding vis.js graph3d construction
        render(<App />);
        shallow(<App />);
    });
});
