var user = require('../../module/user');

function login(req, res)
{
	user.login(req.query, function(data) {
		res.send(data);
	})
}

function register(req, res)
{
	user.register(req.body, function(data) {
		res.send(data);
	})
}

function get_profile(req, res)
{
	user.get_profile(req.query, function(data) {
		res.send(data);
	})
}

function update_profile(req, res)
{
	user.update_profile(req.body, function(data) {
		res.send(data);
	})
}

function reset_password(req, res)
{
	user.reset_password(req.body, function(data) {
		res.send(data);
	})
}

function upload_avatar(req, res)
{
	user.upload_avatar(req.body, function(data) {
		res.send(data);
	})
}


/********************  App  *********************/

function app_login(req, res)
{
	user.app_login(req.query, function(data) {
		res.send(data);
	})
}

function app_register(req, res)
{
	user.app_register(req.body, function(data) {
		res.send(data);
	})
}

module.exports = {
	login: login,
	register: register,
	get_profile: get_profile,
	update_profile: update_profile,
	reset_password: reset_password,
	upload_avatar: upload_avatar,
	//
	app_login: app_login,
	app_register: app_register
}