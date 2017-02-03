/**
 * Simple button element for toggling sidebar
 *
 * Styling found in src/views/plotter.scss
 */
import React from 'react';
import Menu from '../icons/Menu';

const ToggleSidebarBtn = props => (
    <button type='button'
        name='sidebarToggle'
        onClick={props.onClick}
        className={['toggleButton', props.className].join(' ')}>
        <Menu />
    </button>
);

ToggleSidebarBtn.propTypes = {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
};

export default ToggleSidebarBtn;
