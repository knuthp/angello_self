var myModule = angular.module('Angello', [ 'ngResource' ]);

myModule.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

myModule.directive('userstory', function(angelloModel) {
	var linker = function(scope, element, attrs) {
		element.mouseover(function() {
			element.css({
				'opacity' : 0.9
			});
		}).mouseout(function() {
			element.css({
				'opacity' : 1.0
			});
		});
	};

	var controller = function($scope) {
		$scope.deleteStory = function(id) {
			angelloModel.deleteStory(id);
		};
	};

	return {
		restrict : 'A',
		controller : controller,
		link : linker
	};
});

myModule.directive('sortable', function(angelloModel) {
	var linker = function(scope, element, attrs) {
		var status = scope.status.name;
		element.sortable({
			items : 'li',
			connectWith : '.list',
			receive : function(event, ui) {
				var prevScope = angular.element(ui.item.prev()).scope();
				var curScope = angular.element(ui.item).scope();
				scope.$apply(function() {
					angelloModel.insertStoryAfter(curScope.story,
							prevScope.story);
					curScope.story.status = status;
				});
			}
		});
	};
	return {
		restrict : 'A',
		link : linker
	};
});

myModule.directive('chart', function() {
	var parseDataForCharts = function(sourceArray, sourceProp, referenceArray,
			referenceProp) {
		var data = [];
		referenceArray.each(function(r) {
			var count = sourceArray.count(function(s) {
				return s[sourceProp] == r[referenceProp];
			});
			data.push([ r[referenceProp], count ]);
		});
		return data;
	};

	var linker = function(scope, element, attrs) {
		scope.data = parseDataForCharts(scope.sourceArray, attrs['sourceProp'],
				scope.referenceArray, attrs['referenceProp']);

		if (element.is(":visible")) {
			$.plot(element, [ {
				data : scope.data
			} ], {
				series : {
					bars : {
						show : true,
						barWidth : 0.6,
						align : "center"
					}
				},
				xaxis : {
					mode : "categories",
					tickLength : 0
				}
			});
		}
	};

	var controller = function($scope) {

	};

	return {
		restrict : 'A',
		link : linker,
		controller : controller,
		scope : {
			sourceArray : '=',
			referenceArray : '='
		}
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

myModule.factory('storyModel', [ '$resource', function($resource) {
	return $resource('http://127.0.0.1\\:4730/rest/story/:story');
} ]);

myModule.factory('angelloModel', function(storyModel) {
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

	var stories = storyModel.query();

	// var getStories = function() {
	// return stories;
	// };
	var getStories = function() {
		var tempArray = [ {
			id : 0,
			title : 'Story 00',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'Back Log',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'
		}, {
			id : 1,
			title : 'Story 01',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'
		}, {
			id : 2,
			title : 'Story 02',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'To Do',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'

		}, {
			id : 3,
			title : 'Story 03',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'In progress',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'
		}, {
			id : 4,
			title : 'Story 04',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'Code Review',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'
		}, {
			id : 5,
			title : 'Story 05',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'Verified',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'
		}, {
			id : 6,
			title : 'Story 06',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'Done',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'
		}, {
			id : 7,
			title : 'Story 07',
			description : 'Description pending.',
			criteria : 'Criteria pending.',
			status : 'Done',
			type : 'Feature',
			reporter : 'knuthp',
			assignee : 'Gunhild'
		}, {
		} ];
		return tempArray;
	};

	var deleteStory = function(id) {
		stories.remove(function(s) {
			return s.id == id;
		});
		console.log('Delete story:' + id);
	};

	var insertStoryAfter = function(story, prevStory) {
		stories = stories.remove(function(t) {
			return t['id'] == story.id;
		});
		stories = stories.add(story, stories.findIndex(prevStory) + 1);
	};

	return {
		insertStoryAfter : insertStoryAfter,
		getStories : getStories,
		deleteStory : deleteStory,
		getStatuses : getStatuses,
		getTypes : getTypes,
	};
});

myModule.controller('MainCtrl', function($scope, storyModel, angelloModel,
		angelloHelper) {
	$scope.currentStory;
	$scope.types = angelloModel.getTypes();
	$scope.statuses = angelloModel.getStatuses();
	$scope.stories = angelloModel.getStories();
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