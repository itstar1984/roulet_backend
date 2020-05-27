var page = require('../../module/page');

function new_page(req, res)
{
	page.new_page(req.body, function(data) {
		res.send(data);
	})
}

function save_page(req, res)
{
	page.save_page(req.body, function(data) {
		res.send(data);
	})
}

function save_page_app(req, res)
{
	page.save_page_app(req.body, function(data) {
		res.send(data);
	})
}

function get_page(req, res)
{
	page.get_page(req.query, function(data) {
		res.send(data);
	})
}

function get_pages(req, res)
{
	page.get_pages(req.query, function(data) {
		res.send(data);
	})
}

function get_histories(req, res)
{
	page.get_histories(req.query, function(data) {
		res.send(data);
	})
}

function delete_page(req, res)
{
	page.delete_page(req.body, function(data) {
		res.send(data);
	})
}

function save_name(req, res)
{
	page.save_name(req.body, function(data) {
		res.send(data);
	})
}

function save_rating(req, res)
{
	page.save_rating(req.body, function(data) {
		res.send(data);
	})
}

function upload_dealer(req, res)
{
	page.upload_dealer(req.body, function(data) {
		res.send(data);
	})
}

function upload_app_dealer(req, res)
{
	page.upload_app_dealer(req.body, function(data) {
		res.send(data);
	})
}

module.exports = {
	new_page: new_page,
	save_page: save_page,
	save_page_app:save_page_app,
	get_page: get_page,
	get_pages: get_pages,
	get_histories: get_histories,
	delete_page: delete_page,
	save_name: save_name,
	save_rating: save_rating,
	upload_dealer: upload_dealer,
	upload_app_dealer: upload_app_dealer
}