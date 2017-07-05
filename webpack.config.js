const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        path.resolve(__dirname, 'src/index.ts')
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css']
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/index.html'}
        ])
    ]

};
