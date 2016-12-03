'use strict';

import React, { Component } from 'react';
import './option.scss';
import '../../../icon.scss';


export default class Option extends Component {
    constructor () {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
        this.setState({ value: this.props.value });
    }

    handleChange (e) {
        const newValue = !this.state.value;
        this.setState({ value: newValue });
        this.props.handleChange(this.props.parent, this.props.name, newValue);
    }

    render () {
        return (
            <div className='option'>
                {this.props.name}
                <input type='checkbox'
                    name={this.props.name}
                    value={this.state.value}
                    checked={this.state.value}
                    onChange={this.handleChange} />
            </div>
        );
    }
}

Option.propTypes = {
    name: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    parent: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ])
};
