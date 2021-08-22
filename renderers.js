/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const configLoader = require('./config_loader');
configLoader.setFile('homepage-config.json');
const homepageConfig = configLoader.getConfig();

function renderBasic(ver, req, res, opt = {domain: homepageConfig['domain']}) {
    res.render(ver, opt);
}

exports.renderBasic = renderBasic;
