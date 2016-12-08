'use strict';

import React, { Component } from 'react';
import './option.scss';
import '../../../icon.scss';

/**
 * Option will render one of three types of inputs:
 * 1. A component with two text inputs representing a range of values (if this.props.value is an array)
 * 2. A checkbox (if this.props.value is a boolean)
 * 3. A select (if this.props.value is a string) with this.props.values as <option>s
 */

export default class Option extends Component {
    constructor () {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.renderOption = this.renderOption.bind(this);
    }

    componentWillMount () {
        // the state will be determined by the type of Option passed to this component.
        this.setState({ value: this.props.value });
    }

    // send updated value to Plotter only when it is valid
    handleKeyUp (e) {
        // required due to React's synthetic events
        e.persist();

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // set a timeout so that the function can be edited without sending multiple updates
        this.timeout = setTimeout(() => {
            if (e.target.value !== this.state.value) {
                this.props.handleChange(e.target.id, e.target.value);
            }
        }, 500);
    }

    // update internal state to allow user interaction
    handleChange (e) {
        if (Array.isArray(this.state.value)) {
            // create a copy of the value, and update the relevant value
            const newValue = this.state.value.slice();
            newValue[e.target.dataset.isMax] = e.target.value;
            this.setState({ value: newValue });

            // Updates for ranges are validated before calling passed in functions.
            // Booleans and selects don't need validation, so they can be updated immediately
            return;
        }
        this.setState({ value: e.target.value });
        this.props.handleChange(e.target.id, e.target.value);
    }

    renderOption (value) {
        if (Array.isArray(value)) {
            return (
                <span>
                    {this.props.name}
                    <label htmlFor={this.props.id + 'min'}>min
                    <input type='text'
                        value={this.state.value[0]}
                        data-isMax={0}
                        id={this.props.id + 'min'}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp} />
                    </label>
                    <label htmlFor={this.props.id + 'max'}>max
                    <input type='text'
                        value={this.state.value[1]}
                        data-isMax={1}
                        id={this.props.id + 'max'}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp} />
                    </label>
                </span>
            );
        } else if (typeof value === 'boolean') {
            return (
                <label htmlFor={this.props.id}>{this.props.name}
                <input type='text'
                    value={this.state.value}
                    id={this.props.id}
                    onChange={this.handleChange} />
                </label>
            );
        } else {
            return (
                <span>
                    {this.props.name}
                    <select onChange={this.handleChange}
                        id={this.props.id}
                        value={this.state.value}>
                        {
                            this.props.values.map((value) => {
                                return (
                                    <option key={value}
                                        value={value}>
                                        {value}
                                    </option>
                                );
                            })
                        }
                    </select>
                </span>
            );
        }
    }

    render () {
        return (
            <div className='option'>
                {this.renderOption(this.props.value)}
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
        React.PropTypes.array,
        React.PropTypes.bool
    ])
};
