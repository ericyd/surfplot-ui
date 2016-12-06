'use strict';

import React, { Component } from 'react';
import Option from './Option';
import './group.scss';
import '../../../icon.scss';

export default class OptionGroup extends Component {
    constructor () {
        super();
        // If a title exists, then collapse automatically, otherwise don't
        this.state = {
            isCollapsed: !!this.props.title
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    render () {
        return (
            <div className='group'>

                {this.props.title &&
                    (<section className='group__header' onClick={this.handleClick}>
                        <img src='img/icons/iconmonstr-triangle-1.svg'
                            className={['icon',
                                this.state.isCollapsed ? 'is-collapsed' : 'is-expanded'].join(' ')} />
                        {this.props.title}
                    </section>)
                }

                <section className={[
                    'group__options',
                    this.state.isCollapsed ? 'hide' : 'show'].join(' ')}>
                    <ul>
                        {
                            this.props.options.map((option, i, opts) => {
                                return (
                                    <li key={option.id}>
                                        <Option name={option.name}
                                            handleChange={this.props.handleChange}
                                            {...option} />
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
    options: React.PropTypes.array.isRequired,
    handleChange: React.PropTypes.func
};
