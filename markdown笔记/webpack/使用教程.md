- 加载全局webpack
```
//安裝低版本,高版本會報錯
npm install webpack@3.0.0 -g
```

- 文件打包
```
目標文件-生成文件
webpack js/entry.js bundle.js
```

- js配置文件//用于自动生成
```
//手動添加也一樣
touch webpack.config.js
```

- webpack.config.js
```
module.exports = {
    //文件指向
    devtool: 'sourceMap',
    //入口文件
    entry: './js/entry.js',
    //打包生成文件
    output: {
        filename: 'bundle.js'
    }
}
```

- 终端: webpack即可,会自动生成bundle.js与bundle.js.map文件

1. 生成package.json文件
```
npm init
```

2. 放入jquery到package.json
```
npm install jquery --save-dev
```

3. 使用jquery
```
var $ = require('jquery');
$('h1').html('webpack');
```

- 安装css和style loader
```
npm install css-loader style-loader --save-dev
```

- babel安装
```
npm i @babel/core babel-core babel-loader babel-preset-env babel-runtime -D
```

- webpack.packge.js配置
```
module.exports = {
    //文件指向
    devtool: 'sourcemap',
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
            },
            {
                test: /\.js$/,
                loader: 'bebel',
                exculde: /node_modules/
            }
        ]
    },
    //babel
    babel: {
        presets: ['es2015','stage-0'],
        plugins: ['transform-runtime']
    }
}
```