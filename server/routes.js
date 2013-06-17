var snps = require('./snps'),
    express = require('express');


function setup_route(app, method, path, object, func) {
  app[method](path,
    function onRequest(req, res) {
      object[func](req, function onResponse(json_response) {
        res.setHeader('Content-Type', 'application/json');
        res.send(json_response);
      });
    });
}

module.exports.setup = function setup(app) {
  app.use(express.static(__dirname + '/../client/public'));
  setup_route(app, 'get', '/mysnps/page/:page_id', snps, 'get_my_snp_ids');
  setup_route(app, 'get', '/mysnps/:ids', snps, 'get_my_snps');
  setup_route(app, 'get', '/mysnp/:id', snps, 'get_my_snp');
};

