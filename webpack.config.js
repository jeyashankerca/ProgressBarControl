const path = require("path");
const webpack = require("webpack");
module.exports = {    
    mode: "development",
    devtool: "inline-source-map",
    entry: "./index.js",
    output:{
        filename: "bundle.js",
        path: path.join(__dirname,"dist"),
    },
    devServer:{
        contentBase: path.join(__dirname,"dist"),
        port: 8000
    },
    module:{
        rules: [
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets:["env","stage-0","react"]
                    },
                },
            },
            {
                test:/\.css$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ],
            },
            {
                test:/\.tsx?$/,
                use:[
                    {loader: "ts-loader"},
                ],
            },
            {
                test:/\.scss$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},                    
                ],
            },
            {
                test:/\.jpg$/,
                use:[
                    {loader: "url-loader"},
                ],
            },
        ],
    },
}