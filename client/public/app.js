angular.module('app', ['mysnps', 'genotypes', 'knownsnps']);

      function SnpViewer($scope, MySnps, Genotypes, KnownSnps) {
        $scope.snps = [
          {
           id: 'rs1234',
           genotype: 'AA',
           description: 'This is strange.'
          }
        ];

        $scope.knownSnps = KnownSnps;

        $scope.findSnps = function (snpIds) {
          var ids = ($scope.snpIds || snpIds).split(' ');
          $scope.snps.length = 0;
          getMySnps(ids, function (snps) {
            var snpsLen = snps.length, i, snp;
            for (i=0; i<snpsLen; ++i) {
              snp = snps[i];
              if(snp.isRsid) {
                snp.id = 'rs' + snp.id;
              }
              //console.log($scope.snps);
              //$scope.snps.push({"description": "hoho"});
              //$scope.snps.push({"description": "hoho"});
              getSnpGenotypes(snp.id, function(genotypes) {
                snp.description = genotypes.description;
                snp.genotypeDescription = genotypes.genotypes[snp.genotype];
                $scope.$apply(function () {
                  //$scope.snps.push({"description": "hoho"});
                  $scope.snps.push(snp);
                });
              })
            }
          });
        }

        function getMySnps(ids, cb) {
          var snps = MySnps.query({'ids': ids}, function() {
            cb(snps);
          });
        }

        function getSnpGenotypes(id, cb) {
          var genotypes = Genotypes.get({'id': id}, function (genotypes) {
            cb(genotypes);
          }, function(error) {
            cb({"id": id, genotypes: {}});
          });
        }

      }
