/**
 * ValidatedInput provides a controlled input element that is validated
 * against a validator prop before calling the handleChange prop.
 *
 * This pattern is used for inputs which must meet certain criteria before
 * their values are passed up the state chain and shared with sibling components.
 *
 * They are related to DirectInput components, with the difference that ValidatedInput
 * components check the input type or value, and only send it up the state chain if it meets
 * pre-determined criteria
 */

'use strict';

import React, { Component } from 'react';
import './validated-input.scss';

export default class ValidatedInput extends Component {
    constructor () {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.timeout = false;
        this.state = {
            value: ''
        };
    }

    componentWillMount () {
        this.setState({ value: this.props.value });
    }

    handleKeyUp (e) {
        // required due to React's synthetic events
        e.persist();

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // set a timeout so that the function can be edited without sending multiple updates
        this.timeout = setTimeout(() => {
            if (e.target.value !== this.props.value) {
                if (this.props.validate(e.target.value)) {
                    // if a new and parse-able value, send back up to Plotter.js
                    this.props.handleChange(e.target.id, e.target.value);
                } else {
                    console.log('couldnt parse ', e.target.value);
                }
            } else {
                console.log('value didnt change');
            }
        }, 2000);
    }

    handleChange (e) {
        this.setState({ value: e.target.value });
    }

    render () {
        return (
            <div className='validated-block'>
                <input type='text'
                    value={this.state.value}
                    id={this.props.id}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    className='validated-block__input' />
            </div>
        );
    }
}

ValidatedInput.propTypes = {
    value: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func,
    validate: React.PropTypes.func
};
