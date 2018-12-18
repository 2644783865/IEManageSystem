var path = require("path");
var pathMap = require('./src/pathmap.json');
var libPath = path.resolve('./src/lib');
var nodeModPath = path.resolve(__dirname, './node_modules');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var BomPlugin = require('webpack-utf8-bom');    //将文件转成utf-8 bom格式，解决中文乱码的问题
module.exports = {
    // 开发环境
    devtool: 'source-map',
    mode:"development",
    // // 生产环境
    // devtool:'cheap-module-source-map',
    entry: { 
        account:__dirname + "/src/Account/account.jsx",
        consent:__dirname + "/src/Consent/consent.jsx",
        adminiHome:__dirname + "/src/ManageHome/ManageHome.jsx",
        selectSingleData:__dirname + "/src/SelectSingleData/SelectSingleData.js",
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    plugins: [       //生成html
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
            chunks: ['adminiHome']
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
                        presets: ['es2015', 'react'],
                    }
                },
                exclude: /node_modules/
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  options: {
                    bypassOnDebug: true, // webpack@1.x
                    disable: true, // webpack@2.x and newer
                  },
                },
              ],
            },
            {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
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
        modules:[libPath, nodeModPath],
        alias: pathMap
    }
}