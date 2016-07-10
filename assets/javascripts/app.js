
var newsfeedApp = angular.module('newsfeedApp', ['yaru22.angular-timeago', 'NewsFeedServices']);

newsfeedApp.filter('nl2br', ['$sce', function($sce) {
    return function(msg) { 
        var br = '<br />';
        var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ br +'$2');
        return $sce.trustAsHtml(msg);
    }
}]);

newsfeedApp.controller('NewsController', ['$scope', 'NewsFeedServices', '$q', function($scope, NewsFeedServices, $q) {

    var newsController = this;

    $scope.init = function () {
        $scope.loading = true;
        $scope.errors = [];
      
        NewsFeedServices.getFeed({
            token: "8edjjh0jsggscgoscokk8ok0gc40ss0",
            mock: "false"
        }, function (data) {
            console.log(data.data.feed_items);
            $scope.data = data.data.feed_items;

            $scope.data.feed_items.forEach(function(item){
                if(item.type !== "publication") console.log(item.type, item);
            });

            $scope.loading = false;

        }, function (err) {
            $scope.errors.push("Internal error, please try again");
            $scope.loading = false;
        });

    };

    $scope.thanks = function(item) {
        item.likes.push([]);
        item.liked = true;
    };

    $scope.unThanks = function(item) {
        item.likes.pop();
        item.liked = false;
    };

    $scope.comment = function (publication, content) {
        var comment = {
            id: "test",
            content: content,
            date_created: new Date(),
            status: "visible",
            likes: [],
            poster: {
                displayName: "Moi"
            },
            profile: {
                avatar: "https://robohash.org/" + Math.random()
            }
        };

        publication.comments.push(comment);
        publication.newComment = '';

    };

}]);
