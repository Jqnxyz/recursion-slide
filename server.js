/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Tools
const renderers = require('./renderers.js');
const utilities = require('./utilities.js');

// Routing
const express = require('express');
const app = express();
const router = express.Router();
const path = require("path");

// Hide x-powered-by
app.disable('x-powered-by');

// View Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "web/pug_views"));

// Statics
app.use('/assets', express.static('web/assets'));

// Views
router.get("/", (req, res) => {
  utilities.logRequest(req);
  renderers.renderBasic("home", req, res);
});

// App Export
app.use("/", router);
module.exports = app
console.log("Server loaded");