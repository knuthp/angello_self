


describe('Service: angelloModel', function() {
	
	// load the service's module
	beforeEach(module('Angello'));
	
	var modelService, storyModel;
	
	
	// Initialize the service;
	beforeEach(inject(function (angelloModel, storyModel) {
		modelService = angelloModel;
	}));
	
	describe('#getStatuses', function() {
		it('should return seven different statuses', function() {
			expect(modelService.getStatuses().length).toBe(7);
		});
		
		
		it('should have a status named "To Do"', function() {
			expect(modelService.getStatuses().map(function(status) {
				return status.name;
			})).toContain('To Do');
		});
	});
	
	
	
//	describe('#getTypes', function() {
//		
//		it('should have a type named "Bug"', function() {
//			expect(modelService.getTypes().map(function (status) {
//				return status.name;
//			})).toContain('Bug');
//		});
//		
//	});
//	
//	
//	
//	describe('#getStories', function() {
//	
//		it('should return six different stories', function() {
//			expect(modelService.getStories().length).toBe(6);
//		});
//		
//		
//		it('should return stories that have a description property', function() {
//			modelService.getStories().forEach(function (story) {
//				expect(story.description).toBeDefined();
//			});
//		});
//		
//	});
	
}); 