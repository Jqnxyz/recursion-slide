/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const app = require('../server.js')
const supertest = require('supertest')
const request = supertest(app)


// rewrite to use object nesting

const endpointReturnCodes = [200, 302];
const endpoint200 = ['/'];
const endpoint302 = [];

const endpointReturnCodeArrays = [endpoint200, endpoint302];

endpointReturnCodes.forEach( function(element, index) {
  endpointReturnCodeArrays[index].forEach( function(subelement, subindex) {
    it('Testing ' + element + ' type endpoints' + element, async () => {
      const res = await request.get(subelement)
      expect(res.status).toBe(element);
    });
  });
});
