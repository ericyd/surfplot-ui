# About

This app provides a simple and (hopefully) intuitive user interface to visualize mathematical
surfaces. It is inspired by [Calc Plot 3D][CalcPlot], which I used when learning multivariable
calculus. I hope to provide an interface that is slightly more user friendly
and utilizes modern Javascript technologies. It is also my first project using React, so part
of the goal was simply to familiarize myself with React and modern Javascript build tools.

## Roadmap

It is unlikely that this UI will ever be developed to the point of being comparable with [Calc Plot 3D][CalcPlot]. However, any future development would likely follow this general roadmap. Note that many of these features are already available in [Calc Plot 3D][CalcPlot]:

1. Support for multiple surfaces in the same plot
2. Ability to add lines (traces) or points on the surface and adjust with sliders
3. Add implicit and parametric surface support
4. Add vector field and gradient visualization
5. Optionally show tangent or normal vectors at point on surface
6. Add space curves
7. More, but that is plenty of work for now!

## Offline access

If online access is limited, you can launch an offline version of the application.  The offline
version is powered by [Electron][electron].  Hopefully I will eventually figure out how to bundle
it into a cross-platform executable.  Currently in order to use the offline version, you need to
have [Nodejs][node] installed. It is also a bit simpler if you have [Git][git] installed, though it
is not required.  The following instructions are written for command line.

### 1. Download the code and navigate into the directory

If you have git installed, simply run these commands:

```
git clone https://github.com/ericyd/surfplot-ui.git
cd surfplot-ui
```

If you don't have (or don't want to install) Git, you can use these alternative directions:

1. Download the [ZIP](https://github.com/ericyd/surfplot-ui/archive/master.zip) of the repository.
Unzip it in a place you can find it.
2. Open your terminal/command prompt and navigate to the unzipped folder. (e.g. `cd Documents/surfplot-ui`)

### 2. Install dependencies, build, and launch

Once you're in the folder, run these commands:

```
npm install
npm run build:desktop
npm run desktop
```

## Contributing

You can contribute in a number of ways

1. [Open an issue][issue] on Github to report a bug, suggest an update, or start a discussion of a new feature.
2. Submit a pull request with an update or bug fix.  Before submitting a pull request, please run
`npm run precommit`, which will lint your code, test it, and make sure a build succeeds. ESlint warnings are
fine, but errors should be addressed.
3. Star the [repository][repo] on github

[CalcPlot]: http://web.monroecc.edu/manila/webfiles/pseeburger/CalcPlot3D/
[electron]: http://electron.atom.io/
[node]: http://nodejs.org/
[git]: https://git-scm.com/
[issue]: https://github.com/ericyd/surfplot-ui/issues
[repo]: https://github.com/ericyd/surfplot-ui
