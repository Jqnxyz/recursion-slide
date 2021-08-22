/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Abstracting server

// Config
const fs = require('fs');
const util = require('util');
const configLoader = require('./config_loader');
configLoader.setFile('homepage-config.json');
const homepageConfig = configLoader.getConfig();

console.log("---");
console.log("Using config:");
console.log(util.inspect(homepageConfig, {
	'colors': true
}));
console.log("---");

// Set settings
const insecureServer = homepageConfig['insecureWebserver'];
const secureServer = homepageConfig['secureWebserver'];
const httpPort = parseInt(homepageConfig['httpPort']);
const httpsPort = parseInt(homepageConfig['httpsPort']);
const privateCertificateLocation = homepageConfig['private_key'];
const publicCertificateLocation = homepageConfig['public_certs'];


// Https BS
const http = require('http');
const https = require('https');
const privateKey  = secureServer ? fs.readFileSync(privateCertificateLocation, 'utf8') : null;
const certificate = secureServer ? fs.readFileSync(publicCertificateLocation, 'utf8') : null;
const credentials = {
	key: privateKey, 
	cert: certificate
};

// Load server
const app = require('./server.js')

const httpServer = insecureServer ? http.createServer(app) : null;
const httpsServer = secureServer ? https.createServer(credentials, app) : null;

if (httpServer !== null ) httpServer.listen(httpPort);
if (httpsServer !== null ) httpsServer.listen(httpsPort);


console.log("Running Homepage");
console.log("---");
