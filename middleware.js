const fs = require("fs");
const compose = require("compose-middleware").compose;
const serveStatic = require("serve-static");

function rewriteIndex(options) {
  return async function(req, res, next) {
    if (req.path === "/") {
      const index = await fs.promises.readFile(
        __dirname + "/build/index.html",
        { encoding: "utf8" }
      );
      res.send(
        index
          .replace(/\|GRAPHQL_ENDPOINT\|/, options.graphqlEndpoint)
          .replace(/\|DEFAULT_QUERY\|/, options.defaultQuery)
      );
    } else {
      await next();
    }
  };
}

module.exports = function(options) {
  options = options || {};
  options.graphqlEndpoint = options.graphqlEndpoint || "/graphql";
  options.defaultQuery = options.defaultQuery || "";
  return compose([rewriteIndex(options), serveStatic(__dirname + "/build")]);
};
