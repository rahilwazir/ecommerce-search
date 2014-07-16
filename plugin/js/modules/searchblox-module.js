/**
 * Created by cselvaraj on 4/29/14.
 */

'use strict';

var KEYS = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
    comma: 188
};
(function() {
	var app = angular.module('searchbloxModule', ['facetModule','searchblox.controller', 'searchblox.custominput','searchblox.autocomplete','searchblox.factory','searchblox.trust','autocomplete.search','searchblox.service', 'ui.bootstrap', 'ngSanitize','searchblox.contentItem']);
})();