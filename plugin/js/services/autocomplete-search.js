angular.module('autocomplete.search', [])
.service('autocompleteSearch', ['$rootScope', function ($rootScope) {

    function isArray(__var) {
        if (Object.prototype.toString.call(__var) === '[object Array]') {
            return true;
        }

        return false;
    }

    var self = {},
        _results = self.displayData = self.contents =[];

    self.autocomplete_query = self.userQuery = self.textJSON = undefined;
    self.equationCompleted = false;

    self.getAutocompleteQuery = function() {
        return self.autocomplete_query;
    }

    self.setAutocompleteQuery = function(query) {
        self.autocomplete_query = query;
    }

    self.parseTextToObject = function(items, arrayToAppend) {
        var returnObj = {};
        if (isArray(items)) {
            items.forEach(function(item, i) {

                if (typeof item.source === "string") {
                    var source = item.source;
                    
                    source.replace(/[\{\}]/g, '').split(', ').forEach(function(temp) {
                        var or = temp.split('=');
                        if (or[0] === "title") {
                            returnObj.title = or[1];
                        } else if (temp.indexOf("image") > -1) {
                            returnObj.image = temp.match(/image=(.*)/)[1];
                            items[i].image = returnObj.image;
                        } else if (temp.indexOf("retail") > -1){
                            returnObj.price = temp.match(/retail=(.*)/)[1];
                            items[i].price = returnObj.price;
                        } else if (temp.indexOf("sale") > -1){
                            returnObj.saleprice = temp.match(/sale=(.*)/)[1];
                            items[i].saleprice = returnObj.saleprice;
                        } else if (temp.indexOf("productlink") > -1){
                            returnObj.productlink = temp.match(/productlink=(.*)/)[1];
                        }

                    });

                    items[i].source = returnObj
                }
            });

            if (isArray(arrayToAppend)) {
                arrayToAppend.push(returnObj);
            }

            self._results = items;

            self.displayData.push(returnObj);
        }

        self.textJSON = returnObj;
    }

    self.parseResults = function(results, arrayToAppend) {
        if (results.records !== "undefined") {
            try {
                var items = results.records;
                
                self.parseTextToObject(items, arrayToAppend);

                // self._results = self.textJSON;

            } catch (e) {
                console.log(e);
            }
        }
    }

    self.getResults = function() {
        return _results;
    }

    self.setUserQuery = function(value) {
        if (value) {
            self.userQuery
        }
    }

    self.getUserQuery = function() {
        return self.userQuery;
    }

    return self;
}]);