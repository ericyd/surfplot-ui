'use strict';

import React, { Component } from 'react';
import './equation.scss';

export default class Equation extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className='equation'>
                <input type='text' defaultValue={this.props.value} className='equation__input' />
            </div>
        );
    }
}

Equation.propTypes = {
    value: React.PropTypes.string.isRequired
};
