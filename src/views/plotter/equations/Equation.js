'use strict';

import React, { Component } from 'react';
import './equation.scss';

export default class Equation extends Component {
    constructor () {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange (e) {
        this.props.handleChange(parseInt(e.target.id, 10), e.target.value);
    }

    handleDelete (e) {
        this.props.handleDelete(parseInt(e.target.getAttribute('data-forEQ'), 10));
    }

    render () {
        return (
            <div className='equation'>
                <input type='text'
                    value={this.props.value}
                    id={this.props.id}
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
    value: React.PropTypes.string.isRequired
};
