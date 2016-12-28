/*eslint no-unused-expressions: off*/

'use strict';

import { should } from 'chai';
import mathjs from 'mathjs';
import validators from '../../src/utilities/validators';

should();

describe.only('Validators', function () {
    it('should validate numbers', () => {
        //true
        validators.isNumeric(4).should.be.true;
        validators.isNumeric(10000000).should.be.true;
        validators.isNumeric('10000000').should.be.true;

        //false
        validators.isNumeric({ i: 4 }).should.be.false;
        validators.isNumeric([4]).should.be.false;
        validators.isNumeric('four').should.be.false;
    });

    it('should validate equations', () => {
        //true
        validators.isParsable('cos(x) - sin(y)').should.be.true; // OperatorNode
        validators.isParsable('sqrt(x)').should.be.true; // FunctionNode
        validators.isParsable('(x)').should.be.true; // ParenthesisNode
        validators.isParsable('x').should.be.true; // SymbolNode
        validators.isParsable('3').should.be.true; // ConstantNode
        validators.isParsable('x+y').should.be.true;
        validators.isParsable('3 ^ 4').should.be.true;
        validators.isParsable('z * e ^ (cos(x)^2/3*z)').should.be.true;

        //false
        validators.isParsable().should.be.false;
        validators.isParsable(null).should.be.false;
        validators.isParsable(5).should.be.false;
        validators.isParsable(['cos(x) - sin(y)']).should.be.false;
        validators.isParsable({ i: 'x + y' }).should.be.false;
        validators.isParsable('').should.be.false;
        validators.isParsable('cos(x))').should.be.false;
        validators.isParsable('cos(x').should.be.false;
    });

    it('should check all validators passed to isAll', () => {
        const isAll = validators.isAll(validators.isNumeric, validators.isParsable);

        // true
        isAll('4').should.be.true;

        // false
        isAll('cos(x) + sin(y)').should.be.false;
        isAll('4 + 4').should.be.false;
        isAll(4).should.be.false;
        isAll({ i: 4 }).should.be.false;
        isAll(['4']).should.be.false;
    });

    xit('example mathjs output', () => {
        console.log(mathjs.parse('cos(x) + sin(y)').type);
        console.log(mathjs.parse('4').type);
        console.log(mathjs.parse('sqrt(cos(x)+ sin(y))').type);
        console.log(mathjs.parse('sqrt(cos(x)+ sin(y)) + e ^ (x/cos(y))').type);
        console.log(mathjs.parse('').type);
        console.log(mathjs.parse('x+y'));
        console.log(mathjs.parse('0 ^ 4'));
        console.log(mathjs.parse('z * e ^ (cos(x)^2/3*z)'));
        console.log(mathjs.parse('hello'));
        console.log(mathjs.parse(''));
        let m = mathjs.parse('');
        console.log(m.value);
        console.log(mathjs.parse('cos(x))'));
    });
});
