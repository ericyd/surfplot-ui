/**
 * Icon uses a 100x100 grid for layout
 */
import React from 'react';
import Icon from './Icon';

const Menu = props => (
    <Icon className={['menu', props.className].join(' ')}>
        <rect x='0' y='0' width='100' height='10' className='menu-bar'/>
        <rect x='0' y='45' width='100' height='10' className='menu-bar'/>
        <rect x='0' y='90' width='100' height='10' className='menu-bar'/>
    </Icon>
);

Menu.propTypes = {
    className: React.PropTypes.string
};

export default Menu;
