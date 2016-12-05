'use strict';

import React, { Component } from 'react';
import './option.scss';
import '../../../icon.scss';

export default class Option extends Component {
    constructor () {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
        // the state will be determined by the type of Option passed to this component.
        this.setState({ value: this.props.value });
    }

    handleChange (e) {
        const value = e.target.value;
        const id = e.target.id;
        this.setState({ value: value });
        this.props.handleChange(id, value);
    }

    render () {
        return (
            <div className='option'>
                {this.props.name}

                {this.props.values ? (
                    // select
                    <span>select</span>
                ) : (
                    // input
                    <label htmlFor={this.props.id}>{this.props.name}
                    <input type='text'
                        value={this.state.value}
                        id={this.props.id}
                        onChange={this.handleChange} />
                    </label>
                )}
            </div>
        );
        // return (
        //     <span>
        //         <label htmlFor='min'>Min:
        //         <input type='text'
        //             value={this.state.min}
        //             id='min'
        //             data-index={this.props.index}
        //             onChange={this.handleChange} />
        //         </label>
        //         <label htmlFor='max'>Max:
        //         <input type='text'
        //             value={this.state.max}
        //             id='max'
        //             data-index={this.props.index}
        //             onChange={this.handleChange} />
        //         </label>
        //     </span>
        // );
    }
}

Option.propTypes = {
    name: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    parent: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ])
};
