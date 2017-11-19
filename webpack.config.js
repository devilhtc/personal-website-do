var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    //path: path.resolve(__dirname, 'dist')
    path: path.resolve(__dirname, 'devilhtc_do/static/')
  },
  module: {
        rules: [
            { 
                test: /\.jsx?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/ 
            },
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ]
  },
  devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 8000
  }
};