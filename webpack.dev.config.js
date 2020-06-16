const path = require('path');
const exPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require("glob")
const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址

const webpackConf = {
  entry: {
    common: path.resolve('src/common/js/common.js')
    // index: path.resolve('src/js/index.js')
  },

  output: {
    path: path.resolve('dist'),
    filename: "js/[name].[hash].js"
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@src': path.resolve('src'),
      '@common': path.resolve('src/common'),
      '@img': path.resolve('src/images'),
      '@plugin': path.resolve('static/plugin')
    }
  },

  module: {
    loaders: [
      {
        test: /\.scss/,
        use: exPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpe?g|gif|svg|png)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name]_[hash:7].[ext]',
          limit: 100,
          outputPath: 'images/', // 指定文件的输出目录
          publicPath: '/images/' // 请求文件时的url
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/iconfont/[name].[ext]'
        }
      }
    ]
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.20.107:8010/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    disableHostCheck: true,
    //注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    historyApiFallback: true,
    inline: true,
    host: '0.0.0.0',
    port: 9090
  },

  plugins: [
    new exPlugin("css/[name].[hash].css"),
    // new htmlPlugin({ filename: 'index.html', template: 'src/view/index.html', chunks: ['common', 'index'], inject: true }),

    new CopyWebpackPlugin(
      [ // copy静态文件
        {
          from: path.resolve(__dirname, 'src/images'),
          to: 'images',
          ignore: ['.*']
        },
        {
          from: path.resolve(__dirname, 'src/iconfont'),
          to: 'iconfont',
          ignore: ['.*']
        },
        {
          from: path.resolve(__dirname, 'static/plugin'),
          to: 'plugin',
          ignore: ['.*']
        }
      ]
    ),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery"
    })
  ]
}
getEntries().forEach(val => {
  let conf = {
    filename: val.fileName + '.html',
    template: path.join(__dirname, 'src', 'views', val.dirPath || val.fileName, 'index.html'),
    chunks: ['common', val.fileName],
    chunksSortMode: "manual", // chunks 文件按顺序引入
    favicon: 'src/images/favicon.ico',
    inject: true
  }
  webpackConf.plugins.push(new htmlPlugin(conf))
  webpackConf.entry[val.fileName] = path.resolve(`src/views/${val.dirPath || val.fileName}/index.js`)
})

function getEntries () {
  let globPath = 'src/views/**/*/index.html'
  let files = glob.sync(globPath)
  let entries = []
  for (let i = 0; i < files.length; i++) {
    let dirname = { fileName: '', dirPath: '' }
    let filePath = files[i].match(/src\/views\/(\S*)\/index\.html/)[1]
    dirname.fileName = filePath
    if (dirname.fileName.indexOf('/') !== -1) { // 取最下层目录名
      dirname.dirPath = dirname.fileName
      dirname.fileName = dirname.fileName.split('/').pop()
    }
    entries.push(dirname)
  }
  return entries
}

let iPAddress = '';
for(var devName in interfaces){  
  var iface = interfaces[devName];  
  for(var i=0;i<iface.length;i++){  
        var alias = iface[i];  
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
              iPAddress = alias.address;  
        }  
  }  
} 
console.log(iPAddress);
module.exports = webpackConf