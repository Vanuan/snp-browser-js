angular.module('genotypes', []).
factory('Genotypes', function() {
  var Genotypes = {};
  Genotypes.get = function (params, cb) {
    SNPedia.getRsNum(params.id, function(rsnum) {
      var genos = getAlleles(rsnum),
          description = rsnum.Summary,
          genotype = {genotypes:{}};
      asyncParForEach(genos, function(geno, asyncCb) {
        SNPedia.getGenotype(params.id+geno, function(snpedia) {
          genotype.description = description;
          genotype.genotypes[snpedia["allele1"]+snpedia["allele2"]] = snpedia.summary;
          // males have one X chromosome
          if (snpedia["allele1"] == snpedia["allele2"]) {
            genotype.genotypes[snpedia["allele1"]] = snpedia.summary;
          }
          asyncCb();
        });
      }, function () {
        cb(genotype);
      });
    });
  };

  function getAlleles(rsnum) {
    var i=1, alleles = [];
    while(rsnum['geno'+i]) {
      alleles.push(rsnum['geno'+i]);
      ++i;
    }
    return alleles;
  }

  function asyncParForEach(array, fn, callback) {
    var completed = 0;
    if(array.length === 0) {
      callback(); // done immediately
    }
    var len = array.length;
    for(var i = 0; i < len; i++) {
      fn(array[i], function() {
          completed++;
          if(completed === array.length) {
            callback();
          }
        });
    }
  };
  return Genotypes;
});

