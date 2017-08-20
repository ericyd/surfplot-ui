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
import Spinner from '../icons/Spinner';
import Times from '../icons/Times';
import Checkmark from '../icons/Checkmark';
import './inputs.scss';

export default class ValidatedInput extends Component {
    constructor () {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderIndicatorIcon = this.renderIndicatorIcon.bind(this);
        this.timeout = false;
        this.state = {
            value: '',
            isValidated: true,
            isValidating: false
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

        this.setState({ isValidating: true });

        // set a timeout so that the function can be edited without sending multiple updates
        this.timeout = setTimeout(() => {
            // check if value has changed.  Handle arrays a bit differently
            if (Array.isArray(this.state.value) && e.target.value !== this.props.value[e.target.dataset.isMax]) {
                const newValue = this.state.value.slice();
                newValue[e.target.dataset.isMax] = e.target.value;

                if (this.props.validate(e.target.value)) {
                    newValue[0] = +(newValue[0]);
                    newValue[1] = +(newValue[1]);
                    this.props.handleChange(e.target.name, newValue);
                    this.setState({ isValidated: true });
                } else {
                    this.setState({ isValidated: false });
                }

            // check if single-value (e.g. equation) has changed
            } else if (e.target.value !== this.props.value) {
                // validate the result
                if (this.props.validate(e.target.value)) {
                    this.props.handleChange(e.target.id, e.target.value);
                    this.setState({ isValidated: true });
                } else {
                    this.setState({ isValidated: false });
                }
            } else {
                this.setState({ isValidated: true });
            }

            // reset state to correct indicator icon
            this.setState({ isValidating: false });
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

    renderInput () {
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

    renderIndicatorIcon () {
        if (this.state.isValidating) {
            return <Spinner />;
        } else if (this.state.isValidated) {
            return <Checkmark />;
        } else {
            return <Times />;
        }
    }

    render () {
        const input = this.renderInput();
        const indicatorIcon = this.renderIndicatorIcon();
        return (
            <div>
                {input}
                {indicatorIcon}
            </div>
        );
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
