const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),//清空文件插件，默认会清空当前打包的目录
        new CopyWebpackPlugin([ //复制插件 把某个文件复制到其他地方
            {
                from: path.resolve(__dirname, '../public/c.js'), 
                to: path.resolve(__dirname, '../dist/c.js')
            }
        ])
    ]
}