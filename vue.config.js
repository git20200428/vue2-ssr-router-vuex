//webpack插件，生成server bundle 和 client bundle
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
//下面两个是选项合并的包
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
const TARGET_MODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_MODE ? "server" : "client";

module.exports = {
  lintOnSave:false,
  css: {
    extract: false,
  },
  outputDir: "./dist/" + target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    devtool: "source-map",
    target: TARGET_MODE ? "node" : "web",
    node: TARGET_MODE ? undefined : false,
    output: {
      libraryTarget: TARGET_MODE ? "commonjs2" : undefined,
    },
    //可删除
    externals: TARGET_MODE
        ? nodeExternals({
          allowlist: [/\.css$/]
        })
        : undefined,
    //可删除
    optimization: {
      splitChunks: undefined,
    },
    plugins: [
      TARGET_MODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
    ],
  }),
  // 可删除
  chainWebpack: (config) => {
    config.module
        .rule("vue")
        .use("vue-loader")
        .tap((options) => {
          merge(options, {
            optimizeSSR: false,
          });
        });
  }
};
