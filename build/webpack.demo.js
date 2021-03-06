const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 提取 CSS 
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 进度条
const VueLoaderPlugin = require('vue-loader/lib/plugin');// .vue编译
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js

const config = require('./config');

const isProd = process.env.NODE_ENV === 'production';
const isPlay = !!process.env.PLAY_ENV;

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? {
    docs: './examples/entry.js',
    'element-ui': './src/index.js'
  } : (isPlay ? './examples/play.js' : './examples/entry.js'),
  output: {
    path: path.resolve(process.cwd(), './examples/element-ui/'),
    publicPath: process.env.CI_ENV || '', // 基准路径
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js' // 文件改变时才会变化hash值
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: { // 端口
    host: 'localhost',
    port: 8087,
    publicPath: '/',
    noInfo: true,
    open: true, // 默认打开浏览器
    proxy: { // 代理
      '/gateway': {
        target: 'http://scs.dev.cloudyigou.com',
        changeOrigin: true
      }
    } 
  },
  performance: { // 性能
    hints: false // webpack 抛出一个错误或警告
  },
  stats: { // 统计信息
    children: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        // todo: 这种写法有待调整
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/index.tpl',
      filename: './index.html',
      favicon: './examples/favicon.ico'
    }),
    new CopyWebpackPlugin([
      { from: 'examples/versions.json' }
    ]),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    minimizer: [] // MiniCssExtractPlugin使用
  }
};

if (isProd) {
  webpackConfig.externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'highlight.js': 'hljs'
  };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    })
  );
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  );
}

module.exports = webpackConfig;
