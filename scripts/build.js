const webpackConfig = require('../config/webpack.config.js');
const paths = require('../config/paths');
const copyFolder = require('./copy-folder');
const webpack = require('webpack');
const fs = require('fs');

// set environment variable based on which `build` script was run
if (process.argv[2] === 'desktop') {
    process.env.NODE_ENV = 'desktop'
} else {
    process.env.NODE_ENV = 'development'
}

console.log(`Building ${process.env.npm_package_name}\n`)

function build() {
    webpack(webpackConfig).run((err, stats) => {
        if (err) throw err;
        if (stats.compilation.errors.length) {
            console.error(`Failed to compile. ${stats.compilation.errors}`);
            process.exit(1);
        }
        console.log(`√ Bundle Complete!\nBundling took ${(stats.endTime - stats.startTime)/1000} seconds to bundle with Webpack`);
    });
}

build();

function copyPublic() {
    // only copy public if /build or /desktop doesn't exist
    const copyTo = process.env.NODE_ENV === 'development' ? paths.appBuild : paths.appDesktopBuild;
    fs.stat(copyTo, (err, stat) => {
        if (err) copyFolder(paths.appPublic, copyTo);
    });
}

copyPublic();
