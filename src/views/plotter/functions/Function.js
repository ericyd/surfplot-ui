'use strict';

import React, { Component } from 'react';
import './function.scss';

export default class FunctionBar extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className='function'>
                <input type='text' value={this.props.value} className='function__input' />
            </div>
        );
    }
}

Function.propTypes = {
    value: React.PropTypes.string.isRequired
};
