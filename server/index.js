//nodejs服务器
const path = require("path");
const fs = require("fs");
const express = require("express");
//创建express实例
const app = express();
const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require(path.resolve(
  __dirname,
  "../dist/server/vue-ssr-server-bundle.json"
));
const clientManifest = require(path.resolve(
  __dirname,
  "../dist/client/vue-ssr-client-manifest.json"
));
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(
    path.resolve(__dirname, "../public/index.temp.html"),
    "utf-8"
  ),
  clientManifest,
});

//中间件处理静态文件请求
// 在 Express.js 中，app.use(express.static(...)) 是用于提供静态文件的中间件函数。index: false 是传递给
//    express.static 函数的选项之一，用来配置是否允许访问目录下的默认索引文件。
// 具体来说，index: false 的含义是禁用目录索引。当一个请求到达静态文件中间件时，如果请求的路径是一个目录而不是具体的文件名，
//    Express.js 默认会尝试查找该目录下的默认索引文件（如 index.html）。通过设置 index: false，你告诉 Express.js
//    不要自动查找和返回默认索引文件，而是返回一个 404 错误。Express.js会继续调用后面的其他中间件或路由处理程序
app.use(express.static(path.resolve(__dirname, "../dist/client"),{index: false}));
// app.use(express.static(path.resolve(__dirname, "../dist/client")));

//将路由处理将给vue
app.get("*", async (req, res) => {
  try {
    console.log("TTT");
    const context = {
      url: req.url,
      title: "ssr",
    };
    const html = await renderer.renderToString(context);
    res.send(html);
  } catch (e) {
    res.status(500).send("服务器内部错误");
  }
});

app.listen(3002, () => {
  console.log("nodemon server is running on 3002");
});
