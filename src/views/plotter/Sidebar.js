'use strict';

import React from 'react';
import Group from './Group';
import Option from './options/Option';
import Equation from './equations/Equation';
import './sidebar.scss';

/**
 * The Sidebar renders any groups and items of the group that are passed to it.
 * It will render two major item types: Options or Equations
 * It decides between the two based on the presence of props.handleItemDelete,
 * which is only a property passed with the Equation group.
 *
 * If it is passed a handleItemAdd function, it will render an Add button below all groups.
 */

export default function Sidebar (props) {
    return (
        <div className={[
            props.isCollapsed ? 'hide' : 'show',
            'sidebar',
            props.side
        ].join(' ')}>

            {
                Object.keys(props.groups).map((groupName, i) => {
                    const group = props.groups[groupName];
                    return (
                        <Group title={group.name}
                            key={groupName}>
                            {
                                group.items.map((item, i) => {
                                    if (props.handleItemDelete) {
                                        return (
                                            <Equation
                                                value={item.value}
                                                key={item.id}
                                                id={item.id}
                                                handleChange={props.handleItemChange}
                                                handleDelete={props.handleItemDelete} />
                                        );
                                    } else {
                                        return (
                                            <Option
                                                key={item.id}
                                                name={item.name}
                                                handleChange={props.handleItemChange}
                                                {...item} />
                                        );
                                    }
                                })
                            }
                        </Group>
                    );
                })
            }

            {!!props.handleItemAdd &&
                <button type='button'
                    className='addEquation'
                    onClick={props.handleItemAdd}>
                    +
                </button>
            }

        </div>
    );
}

Sidebar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired,
    options: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    handleItemChange: React.PropTypes.func,
    handleItemDelete: React.PropTypes.func,
    handleItemAdd: React.PropTypes.func,
    side: React.PropTypes.string
};
