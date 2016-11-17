const webpackConfig = require('../config/webpack.config.js');
const paths = require('../config/paths');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

console.log(`Building ${process.env.npm_package_name}\n`)

function build() {
    webpack(webpackConfig).run((err, stats) => {
        if (err) throw err;
        if (stats.compilation.errors.length) {
            console.error(`Failed to compile. ${stats.compilation.errors}`);
            process.exit(1);
        }
        console.log(`√ Bundle Complete!\nBundling took ${(stats.endTime - stats.startTime)/1000} seconds to bundle with Webpack`);

        console.log(`
Run the app:

1. npm install -g pushstate-server
2. pushstate-server build
3. Open your browser and go to localhost:9000`)
        });
}




// always pass it relative path names

function copyFolder(source, destination) {
    // get absolute paths from the relative paths passed in
    const cwd = fs.realpathSync(process.cwd());
    const resolvedDestination = path.resolve(cwd, destination);
    const resolvedSource = path.resolve(cwd, source);

    // make the destination directory
    fs.mkdir(resolvedDestination, (err) => {
        if (!err || err.code === 'EEXIST') {
            fs.readdir(resolvedSource, (err, files) => {
                if (err) throw err;

                files.forEach((fileName, i, fileList) => {
                    const resolvedFile = path.resolve(fs.realpathSync(process.cwd()), source, fileName);
                    fs.stat(resolvedFile, (err, stat) => {
                        if (err) throw err;

                        const sourcePath = path.join(source, fileName);
                        const destinationPath = path.join(destination, fileName);

                        if (stat.isDirectory()) {
                            copyFolder(sourcePath, destinationPath);
                        } else {
                            fs.readFile(resolvedFile, (err, fileContents) => {
                                if (err) throw err;

                                fs.writeFile(destinationPath, fileContents, (err) => {
                                    if (err) throw err;
                                    console.log(`√ saved ${sourcePath} to ${destinationPath}\n`);
                                })
                            })
                        }
                    })
                })
            })
        } else {
            throw err;
        }
    });
}


build();
copyFolder(paths.appPublic, paths.appBuild)