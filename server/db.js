var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    db = null,
    dbName = 'snp_browser';

function initDb(name, cb) {
    var server = new Server('localhost', 27017, {auto_reconnect: true});
    db = new Db(name || dbName, server, {safe: false});

    db.open(function (err) {
        if (err) {
            console.log("Error while connecting to database");
        }
        cb(db);
    });
}

module.exports.closeDb = function () {
    db.close();
    db = null;
};

module.exports.getDb = function (cb) {
    if (!db) {
        initDb(null, function (db) {cb(db)});
    }
    else { db };
};

