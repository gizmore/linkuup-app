"use strict";
function LUPGallery(json) {
	console.log('new LUPGallery()', json);
	
	this.JSON = json;
	this.IMAGES = [];
	this.setJSON = function(json) { this.JSON = json; };

	this.id = function() { return this.JSON.gallery_id; };
	
	this.addImage = function(image) { this.IMAGES.push(image); };

}
