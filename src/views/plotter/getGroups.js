/**
 * Returns a `groups` object which contains the basic groups used by Plotter.
 *
 * @return {Object} groups Contains key/value pairs of objects and their contained items
 */

export default function getGroups () {
    return {
        // id values for children must match the corresponding key in Plotter.state
        axes: {
            name: 'Axes',
            items: [
                {
                    name: 'X',
                    id: 'x'
                },
                {
                    name: 'Y',
                    id: 'y'
                },
                {
                    name: 'Z',
                    id: 'z'
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
