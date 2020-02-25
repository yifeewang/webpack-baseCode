const devConfig = require('./webpack.dev.js')
const proConfig = require('./webpack.prod')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env) => { // webpack配置文件可以导出一个函数，函数的参数就是你传入的环境变量(命令行的参数)
    const isDev = env.development
    const baseConfig = {
        entry: {
            main: path.resolve(__dirname, '../src/index.js'),
            b:  path.resolve(__dirname, '../src/b.js')
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, '../', 'dist')
        },
        plugins: [ //webpack 本身就是一个插件， 它是由很多插件组合而成的，在打包时不同的位置上执行不同的插件
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '..', 'public/index.html'),
                filename: 'login.html',
                hash: true, //每次打包到html后加的哈希戳
                minify: !isDev ? {
                    removeAttributeQuotes: true,
                    collapseWhiteSpace: true
                } : false,
                chunksSortMode: 'manual',//手动排序
                chunks:['main'] // 需要引入的代码块
                // excludeChunks: "main"
            }),
            //对于多入口文件，对于引用不同模块，可以继续调用plugin
            new HtmlWebpackPlugin({
                //指定html模板，用于把打包后的js文件打入
                template: path.resolve(__dirname, '..', 'public/index.html'),
                filename: 'index.html',
                hash: true, //每次打包到html后加的哈希戳
                minify: !isDev ? {
                    removeAttributeQuotes: true,
                    collapseWhiteSpace: true
                } : false,
                chunksSortMode: 'manual',//手动排序
                chunks:['b'] // 需要引入的代码块
                // excludeChunks: "main"
            })
        ],
        // 我们需要转化js，把es8,es7,es6等转化成es5 
        //babel ( @babel/core -> babel的核心模块,提供转化的方法   @babel.preset-env ->这个包是需要@babel/core支持的，用来将es678转化成es5    babel-loader -> 这个包用babel核心模块来处理)
        module: {//要处理的模块
            rules: [//默认loader执行顺序是从右往左,从下往上
                // {
                //     test: /\.js$/,
                //     use: 'eslint-loader',
                //     exclude: /node_modules/,
                //     enforce: 'pre' //强制在所有js的loader之前执行 
                // },
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        } 
    }
    console.log(isDev);
    
    return isDev ? merge(baseConfig, devConfig) : merge(baseConfig, proConfig)

}



//.............................................................................
//webpack的默认配置文件 webpack特点是基于node.js,遵循commonjs规范
// const path = require('path')

// module.exports = {
//     entry: path.resolve(__dirname, '..', './src/index.js'),
//     output: {
//         path: path.resolve(__dirname, '..', './dist'),
//         filename: 'bundle.js'
//     }
// }