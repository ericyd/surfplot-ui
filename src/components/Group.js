/**
 * Group is a relatively simple container with an optional title
 * that collapses the group when clicked. It will render the title
 * if this.props.title exists.
 */

'use strict';

import React, { Component } from 'react';
import Arrow from '../icons/Arrow';
// used for adding hover effect to group__header
import '../icons/icon.scss';
import './group.scss';


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
                    (<section className='group__header hoverable' onClick={this.handleClick}>
                        <Arrow className={this.state.isCollapsed ? '' : 'is-expanded'} />
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

// eslint-plugin-react complains about missing 'children' in propTypes
// but react docs explicitly state that 'children' should be treated as an opaque data type
// (https://facebook.github.io/react/docs/react-api.html#react.children),
// and eslint-plugin-react doesn't allow you to declare "any".
// So there is no way to not get a warning for components that use props.children.
// I would open an issue, but the rules that are being enforced are for good reason, so I think it's
// just going to be that way.
Group.propTypes = {
    title: React.PropTypes.string
};
