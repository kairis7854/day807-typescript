const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './src/index.ts', //入口
    output: { //出口
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
     
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    module: { //模塊
        rules: [
            {
                test: /\.ts$/, 
                use: [
                    // 配置babel
                    {
                        loader: "babel-loader",
                        options: {
                            //配置預定義環境
                            presets: [
                                [
                                    // 環境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的瀏覽器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方式，"usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node-modules/ //要排除的文件
            },

            //less 設置
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",

                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions' //每個瀏覽器，最新的2個版本
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            //title: "自訂title"
            template: './src/index.html' // 以./src/index.html 當模板
        }),
    ],
    resolve: { //用來設置引用模塊
        extensions: ['.ts', '.js']
    }
}