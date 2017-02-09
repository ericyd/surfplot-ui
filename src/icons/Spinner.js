/**
 * Created with Inkscape
 */
import React from 'react';
import Icon from './Icon';

// from https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
// syntax for arc paths:
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y

// this is a super-helpful interactive demo
// http://codepen.io/lingtalfi/pen/yaLWJG

const Spinner = props => (
    <Icon className={['spinner', props.className].join(' ')}>
        <path d='M0 50 A 50 50 0 0 0 50 100' />
    </Icon>
);

Spinner.propTypes = {
    className: React.PropTypes.string
};

export default Spinner;
