'use strict';

import React, { Component } from 'react';
import './sidebar.scss';

export default class FunctionBar extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className={this.props.isCollapsed ? 'hide' : 'show'}>
                here I am, Function Bar
            </div>
        );
    }
}

FunctionBar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired
};
