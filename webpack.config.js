var debug = process.env.NODE_ENV !== "production";

var autoprefixer    = require("autoprefixer");
var postcssImport   = require("postcss-import");
var postcssMixins   = require("postcss-mixins");

var webpack         = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/app.js",
  output: {
    path: __dirname + "/deploy",
    filename: "bundle.min.js"
  },
  plugins: debug ? 
      // DEV
  [
    new webpack.ProvidePlugin({riot: 'riot'})
  ] : // PROD
  [
    new webpack.ProvidePlugin({riot: 'riot'}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  
  module: {
    preLoaders: [
      { 
        test: /\.tag\.html$/, 
        exclude: /node_modules/, 
        loader: 'riotjs-loader', 
        query: { 
          type: 'none'
        }
      }
    ],
    loaders: [
      {
        test: /\.js$|\.tag\.html$/,
        exclude: /node_modules/,
        loader: 'babel-loader' 
      },
      { 
        test: 
        /\.css$/, 
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ],
  },
  
    
  postcss: function() {
    return [postcssImport, postcssMixins, autoprefixer];
  },
  
  devServer: {
    contentBase: './'
  }
};