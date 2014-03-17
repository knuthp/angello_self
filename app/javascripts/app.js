var myModule = angular.module('Angello', ['ngResource']);

myModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);


myModule.directive('userstory', function() {
	var linker = function (scope, element, attrs) {
		element.mouseover(function() {
			element.css({ 'opacity' : 0.9});
		}).mouseout(function() {
			element.css({ 'opacity' : 1.0});
		});
	};
	
	var controller = function ($scope) {
		// Pending
	};
	
	return {
		restrict : 'A',
		controller : controller,
		link : linker
	};
});

myModule.factory('angelloHelper', function() {
	var buildIndex = function(source, property) {
		var tempArray = [];
		for ( var i = 0, len = source.length; i < len; ++i) {
			tempArray[source[i][property]] = source[i];
		}
		return tempArray;
	};
	return {
		buildIndex : buildIndex
	};
});

myModule.factory('storyModel', ['$resource', function ($resource){
	return $resource('http://127.0.0.1\\:4730/rest/story/:story');
}]);


myModule.factory('angelloModel', function($resource) {
	var getStatuses = function() {
		var tempArray = [ {
			name : 'Back Log'
		}, {
			name : 'To Do'
		}, {
			name : 'In progress'
		}, {
			name : 'Code review'
		}, {
			name : 'QA Review'
		}, {
			name : 'Verified'
		}, {
			name : 'Done'
		}, ];
		return tempArray;
	};

	var getTypes = function() {
		var tempArray = [ {
			name : 'Feature'
		}, {
			name : 'Enhancement'
		}, {
			name : 'Bug'
		}, {
			name : 'Spike'
		}, ];
		return tempArray;
	};
	
	
	return {
		getStatuses : getStatuses,
		getTypes : getTypes,
	};
});

myModule.controller('MainCtrl', function($scope, storyModel, angelloModel, angelloHelper) {
	$scope.currentStory;
	$scope.types = angelloModel.getTypes();
	$scope.statuses = angelloModel.getStatuses();
	$scope.stories = storyModel.query();
	$scope.typesIndex = angelloHelper.buildIndex($scope.types, 'name');
	$scope.statusesIndex = angelloHelper.buildIndex($scope.statuses, 'name');

	
	
	$scope.setCurrentStory = function(story) {
		$scope.currentStory = story;
		$scope.currentStatus = $scope.statusesIndex[story.status];
		$scope.currentType = $scope.typesIndex[story.type];
	};

	
	$scope.save = function(story) {
		storyModel.save(story, function(resp) {
	        console.log("Response from POST: %j", resp);
		});
		console.log(JSON.stringify(story));
		
	};

	$scope.createStory = function() {
		$scope.stories.push({
			title : "New Story",
			description : "Description pending.",
			criteria : "Criteria pending",
			status : "Back Log",
			type : "Feature",
			reporter : "Pending",
			assigne : "Pending"
		});
	};

	$scope.setCurrentStatus = function(status) {
		if (typeof $scope.currentStory !== 'undefined') {
			$scope.currentStory.status = status.name;
		}
	};

	$scope.setCurrentType = function(type) {
		if (typeof $scope.currentStory !== 'undefined') {
			$scope.currentStory.type = type.name;
		}
	};

});