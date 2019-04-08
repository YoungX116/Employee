const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/*", { target: "http://localhost:8888" }));
  app.use(proxy("/api/getone/*", { target: "http://localhost:8888" }));
  app.use(proxy("/api/deleteone/*", { target: "http://localhost:8888" }));
  app.use(proxy("/api/deleteavatar/*", { target: "http://localhost:8888" }));
  app.use(proxy("/api/updateone/*", { target: "http://localhost:8888" }));
  app.use(proxy("/api/getavatar/*", { target: "http://localhost:8888" }));
  app.use(proxy("/avatar/*", { target: "http://localhost:8888" }));
  app.use(
    proxy("/api/updatesubordinate/*", { target: "http://localhost:8888" })
  );
};
