const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const path = require("path");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.ts",
  plugins: [
		new NodePolyfillPlugin(),
	],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      export: "default",
      type: "commonjs"
    },
    assetModuleFilename: 'images/[name][ext]'
  },
  resolve: {
    symlinks: false,
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      fs: false,
      path: false
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                plugins: [new LessPluginAutoPrefix({ browsers: ["last 3 versions"] })],
                javascriptEnabled: true,
	      },
            },
          },
        ],
      },
    ],
  },
  externals: [
    {
      lodash: "lodash",
      react: "react",
      "react-dom": "react-dom",
    },
    /^antd/i,
  ],
};
