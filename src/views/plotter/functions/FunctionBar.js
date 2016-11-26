'use strict';

import React, { Component } from 'react';
import Function from './Function';
import '../sidebar.scss';

export default class FunctionBar extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className={[
                this.props.isCollapsed ? 'hide' : 'show',
                'sidebar',
                'left'
            ].join(' ')}>
                {
                    this.props.functions.map((func) => {
                        return <Function value={func.value} />;
                    })
                }
            </div>
        );
    }
}

FunctionBar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired,
    functions: React.PropTypes.array.isRequired
};
