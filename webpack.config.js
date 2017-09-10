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
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/index.html'}
        ])
    ]

};
