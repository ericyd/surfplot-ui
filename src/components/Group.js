'use strict';

import React, { Component } from 'react';
import './group.scss';
import '../../icon.scss';

/**
 * Group is a relatively simple container with an optional title
 * that collapses the group when clicked. It will render the title
 * if this.props.title exists.
 */

export default class Group extends Component {
    constructor () {
        super();
        // If a title exists, then collapse automatically, otherwise don't
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount () {
        this.setState({ isCollapsed: !!this.props.title });
    }

    handleClick (e) {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    render () {
        return (
            <div className='group'>

                {!!this.props.title &&
                    (<section className='group__header' onClick={this.handleClick}>
                        <img src='img/icons/iconmonstr-triangle-1.svg'
                            className={['icon',
                                this.state.isCollapsed ? 'is-collapsed' : 'is-expanded'].join(' ')} />
                        {this.props.title}
                    </section>)
                }

                <section className={[
                    'group__items',
                    this.state.isCollapsed ? 'hide' : 'show'].join(' ')}>
                    {this.props.children}
                </section>

            </div>
        );
    }
}

Group.propTypes = {
    title: React.PropTypes.string
};
