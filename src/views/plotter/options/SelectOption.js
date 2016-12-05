'use strict';

import React, { Component } from 'react';
import './option.scss';
import '../../../icon.scss';


export default class SelectOption extends Component {
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
        console.log(newValue);
        this.setState(newValue);
        this.props.handleChange(this.props.parent, this.props.index, id, value);
    }

    render () {
        return (
            <select onChange={this.handleChange}
                id='selected'
                value={this.state.selected}>
                {
                    this.props.data.values.map((value) => {
                        return (
                            <option key={value}
                                value={value}>
                                {value}
                            </option>
                        );
                    })
                }
            </select>
        );
    }
}

SelectOption.propTypes = {
    name: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    parent: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ])
};
