'use strict';

import React, { Component } from 'react';

export default class BooleanOption extends Component {
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
            <input type='checkbox'
                name={this.props.name}
                value={this.state.value}
                checked={this.state.value}
                onChange={this.handleChange} />
        );
    }
}

BooleanOption.propTypes = {
    name: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    parent: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ])
};
