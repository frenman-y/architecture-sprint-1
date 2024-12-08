const path = require('path');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'mesto',
        projectName: 'auth',
        webpackConfigEnv,
        argv,
    });

    return merge(defaultConfig, {
        output: {
            publicPath: 'http://localhost:8500/',
        },
        devServer: {
            port: 8500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
    });
};
