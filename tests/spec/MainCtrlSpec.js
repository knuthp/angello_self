


describe('Controller : MainCtrl', function () {
	
	beforeEach(module('Angello'));
	
	var MainCtrl, scope;
	
	beforeEach(inject(function ($controller) {
		scope = {};
		MainCtrl = $controller('MainCtrl', {
			$scope : scope
		});
	}));
	
	
//	it('should attach a list of story types to the scope', function() {
//		expect(scope.types).toBeDefined();
//	});
//	
//	it('should attach a list of story statuses to the scope', function() {
//		expect(scope.statuses).toBeDefined();
//	});
//	
//	it('should attach a list of stories to the scope', function() {
//		expect(scope.stories).toBeDefined();
//	});
	
	
});

