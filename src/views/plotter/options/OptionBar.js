'use strict';

import React, { Component } from 'react';
import OptionGroup from './OptionGroup';
import '../sidebar.scss';

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

                {
                    Object.keys(this.props.options).map((group, i) => {
                        return (
                            <OptionGroup title={group}
                                index={i}
                                key={group}
                                options={this.props.options[group]}
                                handleChange={this.props.handleChange} />
                        );
                    })
                }

            </div>
        );
    }
}

OptionBar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired,
    options: React.PropTypes.object,
    handleChange: React.PropTypes.func
};
