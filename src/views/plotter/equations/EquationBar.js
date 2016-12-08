'use strict';

import React, { Component } from 'react';
import Equation from './Equation';
// import Group from '../Group';
import '../sidebar.scss';

export default class EquationBar extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className={[
                this.props.isCollapsed ? 'hide' : 'show',
                'sidebar',
                'left'
            ].join(' ')}>

                {
                    this.props.equations.map((eq) => {
                        // refactor to return a Group instead of Equation
                        // each Group will render a list of items (equations, in this case)
                        // Group will only have a header if a title prop is passed
                        // In this case, Group will only ever render one item, but it will render more for Options
                        // I need to look at the data coming from equations and options and make sure they are similar
                        return (
                            <Equation
                                value={eq.value}
                                key={eq.id}
                                id={eq.id}
                                handleChange={this.props.handleEQChange}
                                handleDelete={this.props.handleEQDelete} />
                        );
                    })
                }

                <button type='button'
                    className='addEquation'
                    onClick={this.props.addEquation}>
                    +
                </button>

            </div>
        );
    }
}

EquationBar.propTypes = {
    isCollapsed: React.PropTypes.bool.isRequired,
    equations: React.PropTypes.array.isRequired,
    addEquation: React.PropTypes.func.isRequired,
    handleEQChange: React.PropTypes.func,
    handleEQDelete: React.PropTypes.func
};
