/**
 * DirectInput provides a controlled input element that immediately
 * passes changes in value up the state chain.
 *
 * This pattern is used for inputs which have a pre-determined set of values
 * (primarily select elements, checkboxes, or radio buttons)
 * and whose value is deemed safe to use immediately in sibling components.
 *
 * They are related to ValidatedInput components, with the difference that DirectInput
 * components do not check the input type or value before sending it up the state chain.
 */

'use strict';

import React, { Component } from 'react';
import './inputs.scss';

export default class DirectInput extends Component {
    constructor () {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    componentWillMount () {
        // the state will be determined by the type of Input passed to this component.
        this.setState({ value: this.props.value });
    }

    // update internal state to allow user interaction
    handleChange (e) {
        this.setState({ value: e.target.value });
        this.props.handleChange(e.target.id, e.target.value);
    }

    renderInput (value) {
        if (typeof value === 'boolean') {
            return (
                <span>
                    <label htmlFor={this.props.id}>{this.props.name}
                    <input type='text'
                        value={this.state.value}
                        id={this.props.id}
                        onChange={this.handleChange} />
                    </label>
                </span>
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
            <div className='input direct'>
                {this.renderInput(this.props.value)}
            </div>
        );
    }
}

DirectInput.propTypes = {
    name: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    parent: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.array,
        React.PropTypes.bool
    ])
};
