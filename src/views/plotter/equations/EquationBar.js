'use strict';

import React, { Component } from 'react';
import Equation from './Equation';
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
    addEquation: React.PropTypes.func.isRequired
};
