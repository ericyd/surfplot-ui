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
import './inputs.scss';

export default class ValidatedInput extends Component {
    constructor () {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.timeout = false;
        this.state = {
            value: ''
        };
    }

    componentWillMount () {
        this.setState({ value: this.props.value });
    }

    /**
     * while handleChange sets the component's state for every keystroke,
     * handleKeyUp is used to validate the input before sending it up the scope chain.
     * A timeout is used to allow the user to make several changes before attempting to process it;
     * this is to save unnecessary overhead when redrawing the plot figure.
     */
    handleKeyUp (e) {
        // required due to React's synthetic events
        e.persist();

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // set a timeout so that the function can be edited without sending multiple updates
        this.timeout = setTimeout(() => {
            if (Array.isArray(this.state.value) && e.target.value !== this.props.value[e.target.dataset.isMax]) {
                const newValue = this.state.value.slice();
                newValue[e.target.dataset.isMax] = e.target.value;
                newValue[0] = +(newValue[0]);
                newValue[1] = +(newValue[1]);
                this.props.handleChange(e.target.name, newValue);
            } else if (e.target.value !== this.props.value) {
                if (this.props.validate(e.target.value)) {
                    this.props.handleChange(e.target.id, e.target.value);
                } else {
                    console.log('couldnt parse ', e.target.value);
                }
            } else {
                console.log('value didnt change');
            }
        }, 1000);
    }

    handleChange (e) {
        if (Array.isArray(this.state.value)) {
            // create a copy of the value, and update the relevant value
            const newValue = this.state.value.slice();
            newValue[e.target.dataset.isMax] = e.target.value;
            this.setState({ value: newValue });
            return;
        }
        this.setState({ value: e.target.value });
    }

    render () {
        if (Array.isArray(this.state.value)) {
            return (
                <div className='input validated'>
                    <label htmlFor={this.props.id + 'min'}>{this.props.name} min
                    <input type='text'
                        value={this.state.value[0]}
                        data-is-max={0}
                        name={this.props.id}
                        id={this.props.id + 'min'}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        className='validated__range' />
                    </label>
                    <label htmlFor={this.props.id + 'max'}>{this.props.name} max
                    <input type='text'
                        value={this.state.value[1]}
                        data-is-max={1}
                        name={this.props.id}
                        id={this.props.id + 'max'}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        className='validated__range' />
                    </label>
                </div>
            );
        } else {
            return (
                <div className='input validated'>
                    <label htmlFor={this.props.id}>{this.props.name}&nbsp;
                    <input type='text'
                        value={this.state.value}
                        id={this.props.id}
                        name={this.props.name}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        className='validated__equation' />
                    </label>
                </div>
            );
        }
    }
}

ValidatedInput.propTypes = {
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.array
    ]).isRequired,
    handleChange: React.PropTypes.func,
    validate: React.PropTypes.func,
    id: React.PropTypes.string,
    name: React.PropTypes.string
};
