var mysql = require('mysql');
var dataconfig = require('../../config/database.json');

var conn = mysql.createConnection(dataconfig);

function login(data, callback)
{
	conn.query('SELECT * FROM users WHERE email = "' + data.email + '"', function(err, row) {
		if (!err) {
			if (row.length > 0)
			{
				conn.query('SELECT * FROM users WHERE email = "' + data.email + '" AND password = MD5("' + data.password + '")', function(err, row) {
					if (!err) {
						if (row.length > 0) {
							callback({ success: true, userinfo: row[0] });
						} else {
							callback({ success: false, message: 'Password is incorrect!' });
						}
					} else {
						console.log(err);
						callback({ success: false });
					}
				})
			} else {
				callback({ success: false, message: 'Email is incorrect!' });
			}
		} else {
			console.log(err);
			callback({ success: false });
		}
	});
}

function register(data, callback)
{
	var field = [];
	var value = [];
	user_exist(data, function(valid_user) {
		if (valid_user['exist']) {
	        callback({ success: false, message: valid_user['exist_type'] + ' is already exist. Please retry again with another ' + valid_user['exist_type'] });
	        return;
	    }

		for (var item in data) {
			if (item == 'password') {
				data[item] = 'MD5(' + JSON.stringify(data[item]) + ')';
			} else if (item == 'conf_password') {
				continue;
			} else {
				data[item] = JSON.stringify(data[item]);
			}

			field.push(item);
			value.push(data[item]);
		}
		
		conn.query('INSERT INTO users(' + field.join(',') + ') VALUES(' + value.join(',') + ')', function(err, row) {
			if (!err) {
				conn.query('SELECT * FROM users WHERE id = (SELECT MAX(id) FROM users)', function(err, row) {
					if (!err) {
						callback({ success: true, userinfo: row[0] });
					} else {
						console.log(err);
						callback({ success: false });
					}
				});
			} else {
				console.log(err);
				callback({ success: false });
			}
		});
	});
}

function get_profile(data, callback)
{
	conn.query('SELECT * FROM users WHERE id = ' + data.user_id, function(err, row) {
		if(!err) {
			callback({ success: true, userinfo: row[0] });
		} else {
			console.log(err);
			callback({ success: false });
		}
	});
}

function update_profile(data, callback)
{
	var updatedata = [];

	conn.query('SELECT * FROM users WHERE NOT id = ' + data.id + ' AND (username = "' + data.username + '" OR email = "' + data.email + '")', function(err, row) {
		if (!err) {
			if (row.length > 0) {
				if (row[0]['username'] == data.username) {
					callback({ success: false, message: 'Username is already exist. Please retry again with another Username' });
				} else {
					callback({ success: false, message: 'Email is already exist. Please retry again with another Email' });
				}
			} else {
				for (var item in data) {
					if (item != 'id') {
						data[item] = JSON.stringify(data[item]);
						updatedata.push(item + '=' + data[item]);
					} else {
						var user_id = data[item];
					}
				}
				
				conn.query('UPDATE users SET ' + updatedata.join(',') + ' WHERE id = ' + user_id, function(err, row) {
					if (!err) {
						conn.query('SELECT * FROM users WHERE id = ' + user_id, function(err, row) {
							if(!err) {
								callback({ success: true, userinfo: row[0] });
							} else {
								console.log(err);
								callback({ success: false });
							}
						});
					} else {
						console.log(err);
						callback({ success: false });
					}
				});
			}
		} else {
			console.log(err);
			callback({ success: false });
		}
	});
}

function reset_password(data, callback)
{
	var updatedata = [];

	for (var item in data) {
		if (item != 'email') {
			data[item] = 'MD5(' + JSON.stringify(data[item]) + ')';
			updatedata.push(item + '=' + data[item]);
		} else {
			var email = JSON.stringify(data[item]);
		}
	}
	
	conn.query('UPDATE users SET ' + updatedata.join(',') + ' WHERE email = ' + email, function(err, row) {
		if (!err) {
			callback({ success: true });
		} else {
			console.log(err);
			callback({ success: false });
		}
	});
}

function user_exist(res, callback)
{
	conn.query('SELECT * FROM users WHERE username = "' + res.username + '" OR email = "' + res.email + '"', function(err, row) {
		if (!err) {
			if (row.length > 0) {
				if (row[0]['username'] == res.username) {				
					callback({ exist: true, exist_type: 'Username' });
				} else {
					callback({ exist: true, exist_type: 'Email' });
				}
			} else {
				callback({ exist: false });
			}
		} else {
			console.log(err);
			callback({ success: false });
		}
	});
}

function upload_avatar(data, callback)
{
	var updatedata = [];

    for (var item in data) {
        if (item != 'id') {
			data[item] = JSON.stringify(data[item]);
			updatedata.push(item + '=' + data[item]);
        } else {
            var user_id = data[item];
		}
    }
    
    conn.query('UPDATE users SET ' + updatedata.join(',') + ' WHERE id = ' + user_id, function(err, row) {
        if (!err) {
			conn.query('SELECT * FROM users WHERE id = ' + user_id, function(err, row) {
				if(!err) {
					callback({ success: true, userinfo: row[0] });
				} else {
					console.log(err);
					callback({ success: false });
				}
			});
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

/***************  App  *****************/

function app_login(data, callback)
{
	conn.query('SELECT * FROM users_app WHERE email = "' + data.email + '"', function(err, row) {
		if (!err) {
			if (row.length > 0)
			{
				conn.query('SELECT * FROM users_app WHERE email = "' + data.email + '" AND password = MD5("' + data.password + '")', function(err, row) {
					if (!err) {
						if (row.length > 0) {
							callback({ success: true, userinfo: row[0] });
						} else {
							callback({ success: false, message: 'Password is incorrect!' });
						}
					} else {
						console.log(err);
						callback({ success: false });
					}
				})
			} else {
				callback({ success: false, message: 'Email is incorrect!' });
			}
		} else {
			console.log(err);
			callback({ success: false });
		}
	});
}

function app_register(data, callback)
{
	var field = [];
	var value = [];
	app_user_exist(data, function(valid_user) {
		if (valid_user['exist']) {
	        callback({ success: false, message: valid_user['exist_type'] + ' is already exist. Please retry again with another ' + valid_user['exist_type'] });
	        return;
	    }

		for (var item in data) {
			if (item == 'password') {
				data[item] = 'MD5(' + JSON.stringify(data[item]) + ')';
			} else {
				data[item] = JSON.stringify(data[item]);
			}

			field.push(item);
			value.push(data[item]);
		}
		
		conn.query('INSERT INTO users_app(' + field.join(',') + ') VALUES(' + value.join(',') + ')', function(err, row) {
			if (!err) {
				conn.query('SELECT * FROM users_app WHERE id = (SELECT MAX(id) FROM users_app)', function(err, row) {
					if (!err) {
						callback({ success: true, userinfo: row[0] });
					} else {
						console.log(err);
						callback({ success: false });
					}
				});
			} else {
				console.log(err);
				callback({ success: false });
			}
		});
	});
}

function app_user_exist(res, callback)
{
	conn.query('SELECT * FROM users_app WHERE email = "' + res.email + '"', function(err, row) {
		if (!err) {
			if (row.length > 0) {
				if (row[0]['email'] == res.email) {				
					callback({ exist: true, exist_type: 'Email' });
				}
			} else {
				callback({ exist: false });
			}
		} else {
			console.log(err);
			callback({ success: false });
		}
	});
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
	app_register: app_register,
}