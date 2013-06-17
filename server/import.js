var reader = require('./reader'),
    writer = require('./writer');

function importFrom23(filename) {
  reader.read(filename, function(snips) {
    console.log(snips.length + " snips read");
    writer.write(filename, snips, function() {
      console.log("written to db.");
    });
  });
}

if (process.argv.length < 3) {
  console.log("\n\tusage: " + process.argv[1] + " filename\n");
} else {
  var filename = process.argv[2];
  console.log("import started...");
  importFrom23(filename);
}
