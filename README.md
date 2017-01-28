# SurfPlot UI
Surface plotting for visualizing mathematical surfaces

This app is under development.  The end goal is to basically create a modern, javascript-based 
version of [Calc Plot 3D][calcplot].

We'll see how successful I am...

## Scripts

* `start`: Run a localhost and launch the development version of the app
* `build`: Build the app into static files
* `build:desktop`: Build the desktop version. Required before running `desktop` task.
* `desktop`: Launch the desktop app, powered by [electron][electron]
* `lint`: Lint with eslint and stylelint
* `lint:fix`: Lint and auto-fix anything that eslint can auto-fix (e.g. indentation)
* `test`: Run all tests
* `precommit`: Lints, tests, and builds to make sure everything is working.

[calcplot]: http://web.monroecc.edu/manila/webfiles/pseeburger/CalcPlot3D/
[electron]: http://electron.atom.io/