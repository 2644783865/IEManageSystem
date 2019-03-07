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
    }
});