# Video Viewer

Video Viewer is a web application that helps you manage a collection of videos.

## Features

* Master-detail view
* Sort videos
* Filter videos
* Table paging

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [npm](https://www.npmjs.com/)

### Installing

1. Clone the repository from GitHub:
```
git clone git://github.com/bradwilder/video-viewer.git
```

2. Navigate into the cloned repository directory:
```
cd video-viewer
```

3. Install the npm dependencies:
```
npm install
```

### Test database

There is a small node project in `testDB/` that will generate a test database named `testDB`. To use it:

1. Start the database server:
```
mongod
```

2. In a separate tab, navigate to `testDB/`

3. Run `npm install`

4. Run `node testDB`

5. In `server/routes/api.js`, find the `database` variable and change it to `"testDB"`.

6. Restart the server.

## Development server

Run `gulp server` to start the app and database servers. You can then navigate to `http://localhost:3007/` if you don't wish to use a dev server.

Run `gulp ngWatch` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Built With

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Authors

* **Brad Wilder** - [bradwilder](https://github.com/bradwilder)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/bradwilder/calendar/blob/master/LICENSE) file for details