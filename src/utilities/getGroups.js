/**
 * Returns a `groups` object which contains the basic groups used by Plotter.
 *
 * @return {Object} groups Contains key/value pairs of objects and their contained items
 */

export default function getGroups () {
    return {
        // id values for children must match the corresponding key in Plotter.state
        equations: {
            name: 'Equation',
            items: [
                {
                    name: 'z = ',
                    id: 'equation',
                    isValidated: true
                }
            ]
        },
        axes: {
            name: 'Axes',
            items: [
                {
                    name: 'X',
                    id: 'x',
                    isValidated: true
                },
                {
                    name: 'Y',
                    id: 'y',
                    isValidated: true
                },
                {
                    name: 'Z',
                    id: 'z',
                    isValidated: true
                }
            ]
        },
        style: {
            name: 'Style',
            items: [
                {
                    name: 'Plot Type',
                    id: 'surfaceType',
                    values: [
                        'surface',
                        'mesh'
                    ],
                    isValidated: false
                }
            ]
        },
        plot: {
            name: 'Plot',
            items: [
                {
                    name: 'Width',
                    id: 'plotWidth',
                    values: [
                        'auto',
                        '100%',
                        '80%',
                        '50%'
                    ],
                    isValidated: false
                },
                {
                    name: 'Height',
                    id: 'plotHeight',
                    values: [
                        'auto',
                        '100%',
                        '80%',
                        '50%'
                    ],
                    isValidated: false
                }
            ]
        }
    };
}
