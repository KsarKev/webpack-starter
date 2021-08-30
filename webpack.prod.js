// note: load/import the file from the package.
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    clean: true,
    filename: 'main.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              sources: false,
            },
          },
        ],
      },
      //https://v4.webpack.js.org/loaders/style-loader/#root
      //https://v4.webpack.js.org/loaders/css-loader/
      {
        test: /\.css$/i,
        // note: if this test match the the next test for css file does not read, for this reason we will use the "exclude" keyword in this rule.
        exclude: /style.css$/,
        use: ['style-loader', 'css-loader'],
      },
      //https://v4.webpack.js.org/plugins/mini-css-extract-plugin/#root
      {
        test: /style.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      //https://v4.webpack.js.org/loaders/file-loader/
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[path][name].[ext]',
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      //https://webpack.js.org/plugins/terser-webpack-plugin/#root
      new TerserPlugin(),
      // https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#root
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    //https://v4.webpack.js.org/plugins/html-webpack-plugin/#root
    new HtmlWebPackPlugin({
      filename: './index.html',
      template: './src/index.html',
    }),
    //https://v4.webpack.js.org/plugins/mini-css-extract-plugin/#root
    new MiniCssExtractPlugin({
      // filename: '[name].[fullhash].css',
      filename: '[name].[fullhash].css',
    }),
    // https://v4.webpack.js.org/plugins/copy-webpack-plugin/#root
    new CopyPlugin({
      patterns: [{ from: 'src/assets/', to: 'assets/' }],
    }),
  ],
};
