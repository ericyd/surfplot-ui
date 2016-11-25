'use strict';

import React, { Component } from 'react';
import './sidebar.scss';

export default class OptionBar extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className={[
                this.props.isCollapsed ? 'hide' : 'show',
                'sidebar',
                'right'
            ].join(' ')}>
                here I am, Option Bar
            </div>
        );
    }
}

OptionBar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired
};
