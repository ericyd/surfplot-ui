'use strict';

import { should } from 'chai';
import { describe, it, beforeEach } from 'mocha';

//necessary in order to call `should` on any object 
should();

describe('santity test', function() {
    it('should be able to run a test', function() {
        const bool = true;
        bool.should.be.true;
    })

    it('should be able to do basic math', function() {
        let m = 5;
        (m + 5).should.be.equal(10);
    })
})