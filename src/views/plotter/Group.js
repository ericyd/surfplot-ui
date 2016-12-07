'use strict';

import React, { Component } from 'react';
// import Option from './options/Option';
// import Equation from './equations/Equation';
import Item from './Item';
import './group.scss';
import '../../icon.scss';

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

                    {
                        this.props.items.map((item, i) => {
                            return (
                                <Item key={item.id}
                                    name={item.name}
                                    id={item.id}
                                    value={item.value}
                                    handleChange={this.props.handleChange}
                                    handleDelete={this.props.handleDelete}
                                    {...item} />
                            );
                        })
                    }
                </section>

            </div>
        );
    }
}

Group.propTypes = {
    title: React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
    handleChange: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    // necessary?
    index: React.PropTypes.number
};
