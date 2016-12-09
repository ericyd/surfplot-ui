/**
 * Returns a `groups` object which contains the basic
 * groups used by Plotter. References values from state.
 *
 * @param {Object} state Contains values used by the groups in the returned object
 * @return {Object} groups Contains key/value pairs of objects and their contained items
 */

export default function getGroups (state) {
    return {
        // id values for children must match the corresponding key in state
        axes: {
            name: 'Axes',
            items: [
                {
                    name: 'X',
                    id: 'x',
                    value: state.x
                },
                {
                    name: 'Y',
                    id: 'y',
                    value: state.y
                },
                {
                    name: 'Z',
                    id: 'z',
                    value: state.z
                }
            ]
        },
        style: {
            name: 'Style',
            items: [
                {
                    name: 'Plot Type',
                    id: 'surfaceType',
                    value: state.surfaceType,
                    values: [
                        'surface',
                        'mesh'
                    ]
                }
            ]
        },
        plot: {
            name: 'Plot',
            items: [
                {
                    name: 'Width',
                    id: 'plotWidth',
                    value: state.plotWidth,
                    values: [
                        'auto',
                        '100%',
                        '80%',
                        '50%'
                    ]
                },
                {
                    name: 'Height',
                    id: 'plotHeight',
                    value: state.plotHeight,
                    values: [
                        'auto',
                        '100%',
                        '80%',
                        '50%'
                    ]
                }
            ]
        }
    };
}
