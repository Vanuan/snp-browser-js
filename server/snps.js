var mydb = require('./db');

module.exports.get_my_snps = function (request, cb) {
  var rsIds = getRsIds(request.params), snps = [];
  mydb.getDb(function(db) {
    db.collection('mygenome', function (err, collection) {
      getSnps(collection, rsIds, cb);
    });
  });
};

function getRsIds(params) {
  var ids = params['ids'];
  ids = ids.split(',').map(function(str) {
    str = str.toLowerCase().replace('rs', '');
    return parseInt(str);
  });
  return ids;
}

function getSnps(collection, rsIds, cb) {
  collection.find({'id': {'$in': rsIds}, 'isRsid': true}).toArray(function(err, result) {
    if(err) {
      cb({'error': err});
    }
    mydb.closeDb();
    cb(result);
  });
}

module.exports.get_my_snp = function (request, cb) {
  cb({id: request.id});
};
