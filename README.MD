# Google Maps Test
This is the repo for the Google Maps Test

This project requires [Node.js (primarily NPM)](https://nodejs.org/) v4+ to run. Before running the project, you'll need to prepare the project for:
- Global Dependencies
- Local Dependencies

To do this, run these commands from your Terminal or CMD:
```sh
$ cd /local/folder/to/your/project
```
Then we need to install the global dependencies for the project
```sh
$ npm run prepare-mac (or prepare-win)
```
Then we need to install the project dependencies for the project and also run the project
```sh
$ npm run serve-mac (or serve-win)
```

After running the previous steps, to run the project simply do `grunt serve` from the Terminal or CMD, and then on your browser go to `http://localhost:3000/`.

This project uses:
- RequireJS
- AngularJS
- Bootstrap
- Lodash

and requires:
- Node Package Manager (NPM)
- Bower
- Grunt
