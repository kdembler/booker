# Booker

Booker is a React + Express fullstack Typescript app that allows you to log your books.

### Note

Tested on Chrome.

## Live demo

Wanna just play with it live? [Go ahead!](https://booker.kdembler.com)

## Installation

Just clone the repo and install the dependencies:

```sh
git clone https://github.com/kdembler/booker

yarn
# or
npm install
```

## Firing it up

### Development setup

To start Booker for development simply run `start` script:

```sh
yarn start
# or
npm start
```

This will start the Webpack development server with hot reload for all your front-end needs and `nodemon` with `ts-node` to keep back-end up to date all the time as well.

### Production setup

To start a production server just go ahead and build it:

```sh
yarn build
# or
npm run build
```

This will bundle the React app for production and build the server.
All's left to do is to fire it up:

```sh
yarn start-server
# or
npm run start-server
```

### Tests

For running tests use:

```sh
yarn test
# or
npm test
```
