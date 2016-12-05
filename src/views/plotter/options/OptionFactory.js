'use strict';

import React from 'react';
import BooleanOption from './BooleanOption';
import RangeOption from './RangeOption';
import SelectOption from './SelectOption';
import './option.scss';
import '../../../icon.scss';


export default function OptionFactory (props) {
    if (props.data.type === 'boolean') {
        return (
            <div className='option'>
                {props.name}
                <BooleanOption {...props} />
            </div>
        );
    } else if (props.data.type === 'range') {
        return (
            <div className='option'>
                {props.name}
                <RangeOption {...props} />
            </div>
        );
    } else if (props.data.type === 'select') {
        return (
            <div className='option'>
                {props.name}
                <SelectOption {...props} />
            </div>
        );
    } else {
        return (
            <div className='option'>
                Something went wrong, so sorry!
            </div>
        );
    }
}

Option.propTypes = {
    name: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    parent: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ])
};
