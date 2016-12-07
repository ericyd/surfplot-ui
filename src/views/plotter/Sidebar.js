'use strict';

import React from 'react';
import Group from './Group';
import './sidebar.scss';

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
                            index={i}
                            key={groupName}
                            items={group.items}
                            handleChange={props.handleItemChange}
                            handleDelete={props.handleItemDelete} />
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
    // <Equation
    //     value={eq.value}
    //     key={eq.id}
    //     id={eq.id}
    //     handleChange={props.handleEQChange}
    //     handleDelete={props.handleEQDelete} />

    // <OptionGroup title={props.groups[group].name}
    //     index={i}
    //     key={group}
    //     options={props.groups[group].children}
    //     handleChange={props.handleItemChange} />
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
