'use strict';

import React, { Component } from 'react';
import './option.scss';
import '../../../icon.scss';


export default class Option extends Component {
    constructor () {
        super();
        this.state = {
            value: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.setState({ value: !this.state.value });
    }

    render () {
        return (
            <div className='option'>
                {this.props.name}
                <input type='checkbox'
                    name={this.props.name}
                    checked={this.state.value}
                    onChange={this.handleChange} />
            </div>
        );
    }
}

Option.propTypes = {
    name: React.PropTypes.string
};
