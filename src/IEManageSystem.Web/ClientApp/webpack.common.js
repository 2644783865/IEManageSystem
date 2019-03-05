var path = require("path");
var pathMap = require('./src/pathmap.json');
var libPath = path.resolve('./src/lib');
var commonPath = path.resolve('./src/Common');
var nodeModPath = path.resolve(__dirname, './node_modules');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BomPlugin = require('webpack-utf8-bom');    //将文件转成utf-8 bom格式，解决中文乱码的问题
module.exports = {
    entry: { 
        account:__dirname + "/src/Account/account.jsx",
        consent:__dirname + "/src/Consent/consent.jsx",
        adminiHome:__dirname + "/src/ManageHome/ManageHome.jsx",
        home:__dirname + "/src/Home/Index.jsx"
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
        // libraryTarget: 'umd'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.$':'jquery',
            'window.jQuery':'jquery',
            Popper: 'popper',
            Chart: 'chart',
            Cookie: "cookie",
            IELib: "ielib",
            IETool: 'ToolLibrary/IETool.js'
        }),
        //这里开始写
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/Account/Login.cshtml',
            template: __dirname + '/src/Account/login.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['account']
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/Consent/Index.cshtml',
            template: __dirname + '/src/Consent/index.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['consent']
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/ManageHome/Index.cshtml',
            template: __dirname + '/src/ManageHome/ManageHome.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['adminiHome', "weatherExport"]
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/Home/Index.cshtml',
            template: __dirname + '/src/Home/Index.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['home']
        }),
        new BomPlugin(true, /\.(cshtml)$/),//解决cshtml中文乱码的问题
    ],
    module: {  
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2017', 'react'],
                    }
                },
                exclude: /node_modules/
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                  {
                    loader: 'file-loader',
                    options:{
                        name: '/images/[hash].[ext]'
                    }
                  }
              ],
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
                  {
                    loader: 'file-loader',
                    options:{
                        name: '/fonts/[hash].[ext]'
                    }
                  }
              ]
            },
            {
                test: /\.(tpl|ejs)$/, 
                loader: 'ejs'
            },
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            { 
                test: /\.scss$/, 
                loader: 'style!css!sass'
            }
        ]
    },
    resolve: {
        extensions: ['.js',"*",".css"],
        modules:[libPath, commonPath, nodeModPath],
        alias: pathMap
    }
}