/**
 * Function that copies a folder recursively from source to destination.
 *
 * @param {string} source A **relative** path to the directory to copy
 * @param {string} destination A **relative** path to the directory to copy to.
 *      If destination does not exist, it will be created.
 */
const fs = require('fs');
const path = require('path');

/*eslint max-nested-callbacks: off */
function copyFolder (source, destination) {
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
                                });
                            });
                        }
                    });
                });
            });
        } else {
            throw err;
        }
    });
}

module.exports = (function () {
    return copyFolder;
})();
