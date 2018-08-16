let path = require('path')

let ExtractTextPlugin = require('extract-text-webpack-plugin')

let HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')

let HtmlWebpackPlugin = require('html-webpack-plugin')

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].main.js',
        publicPath: '/'
    },
    devServer: {
        overlay: true,
        contentBase: 'dist/html'
    },
    module: {
        rules: [
            {
                test:  /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "sass-loader"
                ]
                  })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./css/styles.css"),
        new HtmlWebpackPlugin({
            filetype: 'pug'
          }),
          new HtmlWebpackPlugin({
            filename: 'output.pug'
          }),
          new HtmlWebpackPugPlugin()
      ]
}

module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    }
  }

module.exports = (env, options) => {
    let production = options.mode === 'production'

    conf.devtool = production
                 ? false
                 : 'eval-sourcemap'
    return conf
}