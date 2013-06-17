var express = require('express'),
    routes = require('./routes');


function main() {
    var app = express();
    routes.setup(app);

    app.listen(4000);

    console.log('Listening on port 4000...');
}

main();

