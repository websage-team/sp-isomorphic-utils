module.exports = (appName, webpackDevServerPort = process.env.WEBPACK_DEV_SERVER_PORT || 3001) =>
    __DEV__
        ? `http://localhost:${webpackDevServerPort}/dist/`
        : `/${appName ? `${appName}/` : ''}`