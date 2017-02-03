// set environment variable based on which `build` script was run
if (process.argv[2] === 'desktop') {
    process.env.NODE_ENV = 'desktop';
} else {
    process.env.NODE_ENV = 'production';
}

const webpackConfig = require('../config/webpack.config.prod.js');
const paths = require('../config/paths');
const copyFolder = require('./copy-folder');
const markdown = require('markdown-it')();
const webpack = require('webpack');
const fs = require('fs');
// using odd naming to distinguish from local module 'paths'
const pathNode = require('path');

console.log(`Building ${process.env.npm_package_name} for ${process.env.NODE_ENV} environment\n`);

function build () {
    webpack(webpackConfig).run((err, stats) => {
        if (err) throw err;
        if (stats.compilation.errors.length) {
            console.error(`Failed to compile. ${stats.compilation.errors}`);
            process.exit(1);
        }
        console.log(`√ Bundle Complete!\nBundling took ${(stats.endTime - stats.startTime) / 1000} seconds to bundle with Webpack`);
    });
}

build();

function copyPublic () {
    // only copy public if /build or /desktop doesn't exist
    const copyTo = process.env.NODE_ENV === 'desktop' ? paths.appDesktopBuild : paths.appBuild;
    fs.stat(copyTo, (err, stat) => {
        if (err) copyFolder(paths.appPublic, copyTo);
    });
}

copyPublic();


/**
 * If in desktop version, create html files from markdown and credits
 * Also copy the script that electron uses to set links as external.
 */
if (process.env.NODE_ENV === 'desktop') {
    fs.readFile('./src/views/about.md', (err, file) => {
        if (err) throw err;
        fs.writeFile(pathNode.join(paths.appDesktopBuild, 'about.html'),
            markdown.render(file.toString()),
            (err) => {
                if (err) console.log(err)
            });
    });
    fs.readFile('./src/views/credits.md', (err, file) => {
        if (err) throw err;
        fs.writeFile(pathNode.join(paths.appDesktopBuild,'credits.html'),
            markdown.render(file.toString()),
            (err) => {
                if (err) console.log(err)
            });
    });
    fs.readFile('./scripts/openLinksExternally.js', (err, file) => {
        if (err) throw err;
        fs.writeFile(pathNode.join(paths.appDesktopBuild, 'openLinksExternally.js'),
            file.toString(),
            (err) => {
                if (err) console.log(err)
            });
    });
}
