'use strict';

import { should } from 'chai';

//necessary in order to call `should` on any object
should();

describe('Sanity', function () {
    it('should be able to run a test', () => {
        const bool = true;
        bool.should.equal(true);
    });

    it('should be able to do basic math', () => {
        let m = 5;
        (m + 5).should.equal(10);
    });
});
