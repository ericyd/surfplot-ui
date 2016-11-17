const copyFolder = require('./copy-folder');
const paths = require('../config/paths');

copyFolder(paths.appPublic, paths.appBuild);