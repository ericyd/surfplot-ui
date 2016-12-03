'use strict';

import React, { Component } from 'react';
import OptionGroup from './OptionGroup';
import '../sidebar.scss';

export default class OptionBar extends Component {
    constructor () {
        super();
        this.groups = [
            {
                title: 'Axes',
                options: [
                    'X',
                    'Y',
                    'Z'
                ]
            },
            {
                title: 'Style',
                options: [
                    'graph type'
                ]
            }
        ];
    }

    render () {
        return (
            <div className={[
                this.props.isCollapsed ? 'hide' : 'show',
                'sidebar',
                'right'
            ].join(' ')}>

                {
                    this.groups.map((group, i) => {
                        return (
                            <OptionGroup title={group.title}
                                index={i}
                                key={group.title}
                                options={group.options} />
                        );
                    })
                }

            </div>
        );
    }
}

OptionBar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired
};
