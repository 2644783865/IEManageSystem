const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  	devtool: 'inline-source-map',
 	mode:"development",
  	devServer: {
        contentBase: './build',
        port: 9000,
        historyApiFallback: {
            //使用正则匹配命中路由
            rewrites: [
                {from: /^\/ManageHome/, to: '/ManageHome/Index.html'},
            ]
        }
    },
    plugins: [
        //这里开始写
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/Account/Login.html',
            template: __dirname + '/src/Account/login.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['account']
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/Consent/Index.html',
            template: __dirname + '/src/Consent/index.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['consent']
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/ManageHome/Index.html',
            template: __dirname + '/src/ManageHome/ManageHome.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['adminiHome', "weatherExport"]
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/Index.html',
            template: __dirname + '/src/Home/Index.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['home']
        })
    ],
});