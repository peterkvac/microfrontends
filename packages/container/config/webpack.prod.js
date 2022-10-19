const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;
// this gets exposed in the .githut/workflows/container build section
// this will be set up when the CI/CD pipeline is built
// is a string that we get from our AWS service

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    // public path is going to be used any time you have
    // part of webpack that tries to refer to a file that
    // has been built by webpack, eg when html plug in refers
    // to file that has been built by webpack,
    // prepends the script tags for the URL S3 bucket properly
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      // this is a host module, so name is not strictly required
      name: "container",
      //   where we get teh source code from
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
