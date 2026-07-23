"use strict";
function GWFPagination(page, nPages, nItems, ipp) {
	this.page = page||0;
	this.nPages = nPages||0;
	this.nItems = nItems||0;
	this.ipp = ipp||GWFPagination.IPP;
	
	this.nextPage = function() {
		if ( (this.page < this.nPages) || (this.nPages == 0) ){
			this.page++;
			return this.page;
		}
		return 0;
	};
	
	this.pageForIndex = function(index) {
		return parseInt((index / this.ipp) + 1);
	};
	
	this.reset = function() {
		this.page = this.nPages = this.nItems = 0;
		this.ipp = GWFPagination.IPP;
		this.LOADING = {};
		return this;
	};
	
	this.updateWithGWSMessage = function(gwsMessage) {
		this.page = gwsMessage.read16();
		this.nPages = gwsMessage.read16();
		this.nItems = gwsMessage.read32();
		this.ipp = gwsMessage.read16();
		this.gotPage(this.page);
		console.log('GWFPagination.updateWithGWSMessage()', this);
		return this;
	};

	////////////////////////////
	// --- REQUEST MEMORY --- //
	////////////////////////////
	this.LOADING = {};
	this.shouldRequest = function(page) {
		return this.LOADING[page] === undefined;
	};
	this.startRequest = function(page) {
		this.LOADING[page] = 1;
	};
	this.gotPage = function(page) {
		this.LOADING[page] = 2;
	};
	this.failedPage = function(page) {
		this.LOADING[page] = 3;
	};
}
////////////////////
// --- Static --- //
////////////////////
GWFPagination.IPP = 10; // default Items per page

/**
 * Create a pagination from message
 */
GWFPagination.fromGWSMessage = function(gwsMessage) {
	console.log('GWFPagination.fromGWSMessage()');
	var pagination = new GWFPagination();
	return pagination.updateWithGWSMessage(gwsMessage);
};
