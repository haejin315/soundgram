const webpack = require('webpack');
const path = require("path");
const fs = require('fs');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: ["babel-loader"]
      // },
      {
        test: /\.(eot|svg|woff|ttf|woff2)([\?]?.*)$/,
        use: [{
          loader:"file-loader", 
          options:{
            name:'[name].[ext]',
          }
        }]
      },
      {
        test:/\.(png|jpg)$/,
        use:[{
          loader:"file-loader",
          options:{
            name:'[name].[ext]'
          }
        }]

      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
    ]
  },
  entry: {"index":"./index.js",
          "myNfts":"./myNfts.js"},
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.DefinePlugin({
      DEPLOYED_ADDRESS: JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
      DEPLOYED_ABI: fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8'),
      DEPLOYED_ADDRESS_ALBUMSALES: JSON.stringify(fs.readFileSync('deployedAddress_AlbumSales', 'utf8').replace(/\n|\r/g, "")),
      DEPLOYED_ABI_ALBUMSALES: fs.existsSync('deployedABI_AlbumSales') && fs.readFileSync('deployedABI_AlbumSales', 'utf8')

      }),
    new CopyWebpackPlugin([{ from: "./index.php", to: "index.html" },
                           { from: "./myNfts.php", to: "myNfts.html"}]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true, port:3000 },
  node :{
    fs:'empty',
    net:'empty',
    tls:'empty'
  },
};
