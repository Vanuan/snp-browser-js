var myDb = require('./db');

function write(name, snips, cb) {
  myDb.getDb(function(db) {
    console.log("database opened.");
    writeDb(db, name, snips, function() {
      myDb.closeDb();
      console.log("closed");
      cb();
    });
  });
}

function writeDb(db, name, snips, cb) {
  db.collection('mygenome', function (err, collection) {
    if (err) {console.log(err);}
    console.log("remove...")
    collection.remove();
    console.log("insert...")
    insert(collection, snips, cb);
  });
}

function insert(collection, snips, cb) {
  var firstSnips = snips.slice(0, 100000), lastSnips = null;
  console.log(snips.length + " left")
  if (snips.length > 100000) {
    lastSnips = snips.slice(100001, snips.length);
  }
  collection.insert(firstSnips, {safe: true}, function (err, result) {
    if (err) {console.log(err);}
    if (lastSnips) {
      insert(collection, lastSnips, cb);
    } else {
      cb();
    }
  });
}

module.exports.write = write;
