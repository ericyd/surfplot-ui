var config = require('../config/webpack.config');
const paths = require('../config/paths');
const webpack = require('webpack');
const open = require('open');
const WebpackDevServer = require('webpack-dev-server');
// config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
});
server.listen(8080, 'localhost', function() {
    console.log('Your browser should open automatically to http://localhost:8080');
    console.log('When you make changes, the app will recompile automatically, but you may have to manually refresh the page');
    open('http://localhost:8080/webpack-dev-server/index.html');
});
