/*
 Input format: Each line corresponds to one SNP marker.
               The lines started with "#" are comments
*/
var lazy = require("lazy"),
    fs = require('fs'),
    X = 231, Y = 232, MT = 233;

module.exports.X = X;
module.exports.Y = Y;
module.exports.MT = MT;

// getall
function read(filename, cb) {
  var snps = [];
  new lazy(fs.createReadStream(filename))
    .on("end", function () {
      cb(snps);
    })
    .lines.map(String)
    .forEach(function(line){
      if((line[0] == '#')) {
        //console.log(line);
      } else {
        var snp = toSNP(line);
        snps.push(snp);
      }
    });
}

// split
function toSNP(line) {
  var snip = (line.replace('\r', '').split('\t')), isRsid, id;
  if (snip[0].indexOf("rs") == 0) {
    isRsid = true;
    id = snip[0].replace('rs', '');
  } else {
    isRsid = false;
    id = snip[0].replace('i', '');
  }
  if (snip[1] == 'X') {
    snip[1] = X;
  } else if (snip[1] == 'Y') {
    snip[1] = Y;
  } else if (snip[1] == 'MT') {
    snip[1] = MT;
  }
  if (!parseInt(snip[1])) {
    console.log(snip[1]);
  }
  return {id: parseInt(id), isRsid: isRsid,
          chromosome: parseInt(snip[1]),
          seqnumber: parseInt(snip[2]),
          genotype: snip[3]
         };
}

module.exports.read = read;
