const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin(
    {
      template: './src/index.html',
    },
  ),
  new MiniCssExtractPlugin({
    filename: 'style.min.css',
  }),
];
let mode = 'development';

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode,
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      })],
  },
  plugins,
  entry: ['./src/index.jsx'],
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'build/'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: {
                // 'primary-color': '#1DA57A',
                // 'link-color': '#1DA57A',
                // 'border-radius-base': '2px',
              },
              javascriptEnabled: true,
            },
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        // loader: 'url-loader',
        // options: {
        //   limit: 8192,
        // },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    hot: true,
    open: true,
  },
};
