"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs-extra");
var node = require("node-sass");
var res = node.renderSync({
    file: './css/index.scss'
});
fs.writeFileSync('./aws-content/custom.css', res.css.toString());
var app = express();
app.use(express.static('./aws-content'));
app.listen(8080);
