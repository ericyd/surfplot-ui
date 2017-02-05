/**
 * The Sidebar renders any groups and items of the group that are passed to it.
 * It will render two major item types: DirectInputs or ValidatedInputs
 * It decides between the two based on the presence of props.handleItemDelete,
 * which is only a property passed with the ValidatedInput group.
 *
 * If it is passed a handleItemAdd function, it will render an Add button below all groups.
 */

'use strict';

import React from 'react';
import Group from './Group';
import DirectInput from './DirectInput';
import ValidatedInput from './ValidatedInput';
import ToggleSidebarBtn from './ToggleSidebarBtn';
import { isNumeric, isParsable } from '../utilities/validators';
import './sidebar.scss';


export default function Sidebar (props) {
    return (
        <div className={['sidebar', props.isCollapsed ? 'collapsed' : 'expanded'].join(' ')}>
            <ToggleSidebarBtn onClick={props.toggleCollapsed} className='float-right' />

            {
                Object.keys(props.groups).map((groupName, i) => {
                    const group = props.groups[groupName];
                    return (
                        <Group title={group.name}
                            key={groupName}>
                            {
                                group.items.map((item, i) => {
                                    if (item.isValidated) {
                                        return (
                                            <ValidatedInput
                                                value={props[item.id]}
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                handleChange={props.handleItemChange}
                                                validate={item.id === 'equation' ? isParsable : isNumeric} />
                                        );
                                    } else {
                                        return (
                                            <DirectInput
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                handleChange={props.handleItemChange}
                                                value={props[item.id]}
                                                values={item.values} />
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
                    className='addValidatedInput'
                    onClick={props.handleItemAdd}>
                    +
                </button>
            }

        </div>
    );
}

Sidebar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired,
    DirectInputs: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    handleItemChange: React.PropTypes.func,
    handleItemDelete: React.PropTypes.func,
    handleItemAdd: React.PropTypes.func,
    groups: React.PropTypes.object,
    toggleCollapsed: React.PropTypes.func
};
