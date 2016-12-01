'use strict';

import React, { Component } from 'react';
import mathjs from 'mathjs';
import './equation.scss';

export default class Equation extends Component {
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
            if (e.target.value !== this.state.value && mathjs.eval(e.target.value, { x: 0, y: 0 })) {
                // if a new and parse-able value, send back up to Plotter.js
                this.props.handleChange(parseInt(e.target.id, 10), e.target.value);
            } else {
                console.log('couldnt parse ', e.target.value, 'or the values didn\'t change');
            }
        }, 2000);
    }

    handleChange (e) {
        this.setState({ value: e.target.value });
    }

    handleDelete (e) {
        this.props.handleDelete(parseInt(e.target.getAttribute('data-forEQ'), 10));
    }

    render () {
        return (
            <div className='equation'>
                <input type='text'
                    value={this.state.value}
                    id={this.props.id}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    className='equation__input' />
                <button type='button'
                    className='equation__delete'
                    data-forEQ={this.props.id}
                    onClick={this.handleDelete} >
                    &times;
                </button>
            </div>
        );
    }
}

Equation.propTypes = {
    value: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    id: React.PropTypes.number
};
