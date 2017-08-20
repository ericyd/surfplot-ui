/**
 * For more info on any of this, check out:
 * 1. https://github.com/verekia/js-stack-from-scratch/tree/master/tutorial/7-client-webpack
 * 2. create-react-app hello-world
 */

const paths = require('./paths');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Set up build paths for desktop and dev (i.e. web) builds
// process.env.NODE_ENV is set in scripts/build.js
let entryScript = process.env.NODE_ENV === 'desktop' ? paths.appDesktopIndexJs : paths.appIndexJs;
let buildPath = process.env.NODE_ENV === 'desktop' ? paths.appDesktopBuild : paths.appBuild;

module.exports = {
    entry: {
        index: [
            require.resolve('./polyfills'),
            entryScript
        ]
    },
    output: {
        path: buildPath,
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        inline: true
    },
    devtool: 'eval',
  // devtool: 'source-map',
    plugins: [
        new StyleLintPlugin({
            configFile: './config/stylelint.config.js',
            syntax: 'scss',
            failOnError: false
        })
    ],
    eslint: {
        configFile: 'config/.eslintrc'
    },
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: paths.appSrc
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: paths.appSrc,
                exclude: [/node_modules/]
            },
            {
                test: /\.(sc|sa|c)ss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.md$/,
                loader: 'html!markdown?gfm=false'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        // this allows imports to start at ./src, avoiding ../../icons/Icon.js
        // thanks https://simonsmith.io/using-webpack-to-build-react-components-and-their-assets/
        modulesDirectories: ['node_modules', './src']
    },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
