module.exports = {
    //文件指向
    devtool: 'sourceMap',
    //入口文件
    entry: './js/entry.js',
    //打包生成文件
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
}