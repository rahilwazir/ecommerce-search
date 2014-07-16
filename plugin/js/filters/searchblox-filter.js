/**
 * Created by cselvaraj on 4/29/14.
 */
angular.module('searchblox.trust',[]).filter('trust', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
})
.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});