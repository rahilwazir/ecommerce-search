/**
 * Created by cselvaraj on 5/7/14.
 */

angular.module('searchblox.contentItem', []).
    directive('contentItem', ['$compile', '$http', '$templateCache','$sce', 'autocompleteSearch', function($compile, $http, $templateCache, $sce, autocompleteSearch) {

        var getTemplate = function(contentType) {
            var templateLoader,
                baseUrl = 'views/component-templates/',
                templateMap = {
                    image: 'image.html',
                    video: 'video.html',
                    href: 'href.html'
                };

            var templateUrl = baseUrl + templateMap[contentType];
            templateLoader = $http.get(templateUrl, {cache: $templateCache});

            return templateLoader;

        }

        var linker = function(scope, element, attrs) {
            scope.computeResultToBind(scope.content);
            scope.$watch(function () {
                if (scope.contentUrl && scope.contentType == "video") {
                    scope.url = $sce.trustAsResourceUrl(scope.contentUrl);
                }
                else {
                    scope.url = scope.contentUrl;
                }
            });

            var loader = getTemplate(scope.contentType);

            var promise = loader.success(function(html) {
                element.html(html);
            }).then(function (response) {

                element.replaceWith($compile(element.html())(scope));
               // element.replaceWith( $compile(element.contents())(scope));
            });
        }

        return {
            restrict: 'E',
            scope: {
                content:'='
            },
            link: linker,
            controller: function ($scope) {
                $scope.getLastModified = function (lastmodified) {
                    return moment(lastmodified).format("MMMM Do YYYY, h:mm:ss a");
                }

                $scope.formatData = function (obj) {
                    if (!angular.isArray(obj))
                        return [obj];
                    else
                        return obj;
                }

                // content url generator
                $scope.computeResultToBind = function (result) {
                    // console.log(result);
                    var recstr = JSON.stringify(result.image);
                    $scope.image = result.image;
                    $scope.retail = result.retail;
                    $scope.saleprice = result.saleprice;
                    $scope.productlink = result.productlink;
                    var colid = result.col;
                    recstr = recstr.substring(1, recstr.length - 1);

                    var recstrf = recstr.substring(1, recstr.length);
                    var t = recstr.substring(recstr.lastIndexOf('.') + 1).toLowerCase();
                    var isImage = false;
                    var isVideo = false;

                    if (recstr.startsWith('http') || recstr.startsWith('https')) {
                        if (t == "jpg" || t == "jpeg" || t == "png" || t == "gif" || t == "bmp") {
                            isImage = true;
                        } else if (t == "mpeg" || t == "mp4" || t == "flv" || t == "mpg") {
                            isVideo = true;
                        }
                        $scope.contentUrl = recstr;
                    } else if (recstr.startsWith('/') || recstrf.startsWith(':')) {
                        if (t == "jpg" || t == "jpeg" || t == "png" || t == "gif" || t == "bmp") {
                            var isImage = true;

                        } else if (t == "mpeg" || t == "mp4" || t == "flv" || t == "mpg") {
                            isVideo = true;
                        }
                        $scope.contentUrl = '../servlet/FileServlet?url=' + recstr + '&col=' + colid;
                        if (result.url.lastIndexOf('http', 0) === 0) {
                            $scope.contentUrl = result.url;
                        }
                    }
                    else if (result.url.lastIndexOf('db', 0) === 0) {
                        $scope.contentUrl = '../servlet/DBServlet?col=' + result.col + '&id=' + result.uid;
                    }
                    else if (result.url.split(':')[0] == 'eml') {
                        $scope.contentUrl = '../servlet/EmailViewer?url=' + result.uid + '&col=' + result.col;
                    }
                    else {
                        $scope.contentUrl = result.url;
                    }

                    if (isImage) {
                        $scope.contentType = "image";
                    }
                    else if (isVideo) {
                        $scope.contentType = "video";
                    } else {
                        $scope.contentType = "href";
                    }

                }

            }
        };
    }]);

