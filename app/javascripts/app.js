var myModule = angular.module('Angello', ['ngResource']);

myModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

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
	
	var Story = $resource('http://127.0.0.1\\:4730/rest/story/:story');

	var myStories = [];
	Story.query(function (stories) {
		myStories = stories;
		console.log(JSON.stringify(myStories));
	});

	var getStories = function() {
		var tempArray = [ {
			title : 'Story 00',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Superman'
		}, {
			title : 'Story 01',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Superman'
		}, {
			title : 'Story 02',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Superman'

		}, {
			title : 'Story 03',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Superman'
		}, {
			title : 'Story 04',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Superman'
		}, {
			title : 'Story 05',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Superman'
		} ];
		
		return tempArray;
	};
	
	return {
		getStatuses : getStatuses,
		getTypes : getTypes,
		getStories : getStories
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