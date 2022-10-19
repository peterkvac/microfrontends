const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    // will use /index.html
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      // this time the container is the HOST
      name: "container",
      remotes: {
        // marketing key and name must match that in the webpack.dev.js in 'marketing'
        // to properly load the remoteEntry file
        marketing: "marketing@http://localhost:8081/remoteEntry.js",

        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// devConfig will override or take precedence for similar options between
// commonConfig and devConfig
module.exports = merge(commonConfig, devConfig);
