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
import './direct-input.scss';

export default class DirectInput extends Component {
    constructor () {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    componentWillMount () {
        // the state will be determined by the type of Input passed to this component.
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
            // TODO: Make sure that the values remain as numbers
            if (e.target.value !== this.props.value[e.target.dataset.isMax]) {
                const newValue = this.state.value.slice();
                newValue[e.target.dataset.isMax] = e.target.value;
                newValue[0] = +(newValue[0]);
                newValue[1] = +(newValue[1]);
                this.props.handleChange(e.target.name, newValue);
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

    renderInput (value) {
        if (Array.isArray(value)) {
            return (
                <span>
                    {this.props.name}
                    <label htmlFor={this.props.id + 'min'}>min
                    <input type='text'
                        value={this.state.value[0]}
                        data-is-max={0}
                        name={this.props.id}
                        id={this.props.id + 'min'}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp} />
                    </label>
                    <label htmlFor={this.props.id + 'max'}>max
                    <input type='text'
                        value={this.state.value[1]}
                        data-is-max={1}
                        name={this.props.id}
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
            <div className='direct-input'>
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
