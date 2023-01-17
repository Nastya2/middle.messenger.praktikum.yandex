const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: devMode ? "[name].[contenthash].js" : "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json",],
    fallback : { 
      "fs": false, 
      "os": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false, 
    }
  },
  devServer: {
    compress: true,
    port: 4000,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, 'src'),
        loader: "pug3-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      { test: /\.svg$/, type: "asset" },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              useRelativePath: true,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
};