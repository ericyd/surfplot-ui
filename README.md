# SurfPlot UI
A simple UI for visualizing mathematical surfaces

![Image](https://travis-ci.org/ericyd/surfplot-ui.svg?branch=master)

This app is under development.  The end goal is to basically create a modern, javascript-based 
version of [Calc Plot 3D][calcplot].

## Accessing the UI

The current version of the app can be found online at <http://ericyd.github.io/surfplot-ui>.

Alternatively, you can run an offline version of the app (powered by [Electron][electron]) on your own computer.
This might be more responsive in some cases.

To build and run the offline version, you will need [Nodejs](node) (version 4.x or higher) and [Git][git]*.  Then run the following commands:

```
git clone https://github.com/ericyd/surfplot-ui.git
cd surfplot-ui
npm install
npm run build:desktop
npm run desktop
```

*If you don't have, or don't want to install, Git, you can use these alternative directions:

1. Download the [ZIP](https://github.com/ericyd/surfplot-ui/archive/master.zip) of the repository.
Unzip it in a place you can find it.
2. Open your terminal/command prompt and navigate to the unzipped folder.
3. Run these commands:

```
npm install
npm run build:desktop
npm run desktop
```

## Scripts

* `start`: Run a localhost and launch the development version of the app
* `build`: Build the app into static files
* `build:desktop`: Build the desktop version. Required before running `desktop` task.
* `desktop`: Launch the desktop app, powered by [electron][electron]
* `lint`: Lint with eslint and stylelint
* `lint:fix`: Lint and auto-fix anything that eslint can auto-fix (e.g. indentation)
* `test`: Run all tests
* `precommit`: Lints, tests, and builds to make sure everything is working.

## Contributing

Contributions are encouraged, though you might just want to build your own version since
there isn't really much to be gained by contributing to this repository.
If you decide to contribute, please run `npm run precommit` before submitting a pull
request to make sure that your script passes all the linters and tests.

[calcplot]: http://web.monroecc.edu/manila/webfiles/pseeburger/CalcPlot3D/
[electron]: http://electron.atom.io/
[node]: http://nodejs.org/
[git]: https://git-scm.com/