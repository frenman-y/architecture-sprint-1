const path = require('path');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'mesto',
        projectName: 'profile',
        webpackConfigEnv,
        argv,
    });

    return merge(defaultConfig, {
        output: {
            publicPath: 'http://localhost:8501/',
        },
        devServer: {
            port: 8501,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
    });
};
