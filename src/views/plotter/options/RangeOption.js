'use strict';

import React, { Component } from 'react';
import './option.scss';
import '../../../icon.scss';

export default class RangeOption extends Component {
    constructor () {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
        // the state will be determined by the type of Option passed to this component.
        this.setState(this.props.data);
    }

    handleChange (e) {
        const value = e.target.value;
        const id = e.target.id;
        const newValue = {};
        newValue[id] = value;
        // const newValue = !this.state.value;
        this.setState(newValue);
        this.props.handleChange(this.props.parent, this.props.index, id, value);
    }

    render () {
        return (
            <span>
                <label htmlFor='min'>Min:
                <input type='text'
                    value={this.state.min}
                    id='min'
                    data-index={this.props.index}
                    onChange={this.handleChange} />
                </label>
                <label htmlFor='max'>Max:
                <input type='text'
                    value={this.state.max}
                    id='max'
                    data-index={this.props.index}
                    onChange={this.handleChange} />
                </label>
            </span>
        );
    }
}

RangeOption.propTypes = {
    name: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    parent: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ])
};
