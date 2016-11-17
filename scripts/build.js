const webpackConfig = require('../config/webpack.config.js');
const paths = require('../config/paths');
const copyPublic = require('./copy-public'); // this will run on require
const webpack = require('webpack');


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


build();