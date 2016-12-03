'use strict';

import React, { Component } from 'react';
import Option from './Option';
import './option-group.scss';
import '../../../icon.scss';

export default class OptionGroup extends Component {
    constructor () {
        super();
        this.state = {
            isCollapsed: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount () {
        console.log('unmounting');
    }

    handleClick (e) {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    render () {
        return (
            <div className='option-group'>

                <section className='option-group__header' onClick={this.handleClick}>
                    <img src='img/icons/iconmonstr-triangle-1.svg'
                        className={['icon',
                            this.state.isCollapsed ? 'is-collapsed' : 'is-expanded'].join(' ')} />
                    {this.props.title}
                </section>

                <section className={[
                    'option-group__options',
                    this.state.isCollapsed ? 'hide' : 'show'].join(' ')}>
                    <ul>
                        {
                            Object.keys(this.props.options).map((option, i, opts) => {
                                return (
                                    <li key={option}>
                                        <Option name={option}
                                            parent={this.props.title}
                                            value={this.props.options[option]}
                                            handleChange={this.props.handleChange} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </section>

            </div>
        );
    }
}

OptionGroup.propTypes = {
    title: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired,
    handleChange: React.PropTypes.func
};
