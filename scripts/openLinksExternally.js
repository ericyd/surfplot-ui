/**
 * This script is used in the desktop build only.
 * Running `npm run build:desktop` will copy it into the /desktop directory.
 *
 * The script forces the electron modals to open externally
 */

/*eslint prefer-reflect: off */

// Module for making links open in new window
const shell = require('electron').shell;

function openLinksExternally (window) {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        const url = link.getAttribute('href');
        if (url.indexOf('http') === 0) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                console.log(shell);
                shell.openExternal(url);
            });
        }
    });
}

// woo! http://youmightnotneedjquery.com/
function ready (fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(openLinksExternally);
