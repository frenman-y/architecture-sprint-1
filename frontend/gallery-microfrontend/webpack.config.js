const path = require('path');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'mesto',
        projectName: 'gallery',
        webpackConfigEnv,
        argv,
    });

    return merge(defaultConfig, {
        output: {
            publicPath: 'http://localhost:8502/',
        },
        devServer: {
            port: 8502,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
    });
};
