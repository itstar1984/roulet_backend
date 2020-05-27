var mysql = require('mysql');
var dataconfig = require('../../config/database.json');

var conn = mysql.createConnection(dataconfig);

function new_page(data, callback)
{
	conn.query('INSERT INTO pages(user_id) VALUES(' + data.user_id + ')', function(err, row) {
        if (!err) {
            conn.query('SELECT * FROM pages WHERE id = (SELECT MAX(id) FROM pages WHERE user_id = ' + data.user_id + ')', function(err, row) {
                if (!err) {
                    callback({ success: true, pageinfo: row[0] });
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

function save_page(data, callback)
{
    var updatedata = [];

    for (var item in data) {
        if (item != 'page_id') {
            data[item] = '"' + JSON.stringify(data[item]) + '"';
            updatedata.push(item + '=' + data[item]);
        } else {
            var page_id = data[item];
        }
    }
    
    conn.query('UPDATE pages SET ' + updatedata.join(',') + ' WHERE id = ' + page_id, function(err, row) {
        if (!err) {
            callback({ success: true });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function save_page_app(data, callback)
{
    var updatedata = [];

    for (var item in data) {
        if (item != 'page_id') {
            if(Array.isArray(data[item]))
            {
                data[item] = JSON.stringify(data[item]);    
            }
            
            updatedata.push(item + '="' + data[item] + '"');
        } else {
            var page_id = data[item];
        }
    }
    
    conn.query('UPDATE pages SET ' + updatedata.join(',') + ' WHERE id = ' + page_id, function(err, row) {
        if (!err) {
            callback({ success: true });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function get_page(data, callback)
{
	conn.query('SELECT * FROM pages WHERE id = ' + data.page_id, function(err, row) {
        if (!err) {
            callback({ success: true, historyinfo: row[0] });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function get_pages(data, callback)
{
	conn.query('SELECT * FROM pages WHERE (casino_name LIKE "%' + data.search_key + '%" OR dealer_name LIKE "%' + data.search_key + '%") AND user_id = ' + data.user_id + ' ORDER BY created_at DESC', function(err, row) {
        if (!err) {
            callback({ success: true, historyinfo: row });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function get_histories(data, callback)
{
	conn.query('SELECT * FROM pages WHERE user_id = ' + data.user_id + ' ORDER BY created_at DESC', function(err, row) {
        if (!err) {
            callback({ success: true, historyinfo: row });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function delete_page(data, callback)
{
	conn.query('DELETE FROM pages WHERE id = ' + data.page_id, function(err, row) {
        if (!err) {
            conn.query('SELECT * FROM pages WHERE user_id = ' + data.user_id + ' ORDER BY created_at DESC', function(err, row) {
                if (!err) {
                    callback({ success: true, historyinfo: row });
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

function save_name(data, callback)
{
    var updatedata = [];

    for (var item in data) {
        if (item != 'page_id') {
            data[item] = JSON.stringify(data[item]);
            updatedata.push(item + '=' + data[item]);
        } else {
            var page_id = data[item];
        }
    }
    
    conn.query('UPDATE pages SET ' + updatedata.join(',') + ' WHERE id = ' + page_id, function(err, row) {
        if (!err) {
            callback({ success: true });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function save_rating(data, callback)
{
    var updatedata = [];

    for (var item in data) {
        if (item != 'page_id') {
            updatedata.push(item + '=' + data[item]);
        } else {
            var page_id = data[item];
        }
    }
    
    conn.query('UPDATE pages SET ' + updatedata.join(',') + ' WHERE id = ' + page_id, function(err, row) {
        if (!err) {
            callback({ success: true });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function upload_dealer(data, callback)
{
	var updatedata = [];

    for (var item in data) {
        if (item != 'page_id') {
			data[item] = JSON.stringify(data[item]);
            updatedata.push(item + '=' + data[item]);
        } else {
            var page_id = data[item];
		}
    }
    
    conn.query('UPDATE pages SET ' + updatedata.join(',') + ' WHERE id = ' + page_id, function(err, row) {
        if (!err) {
            callback({ success: true });
        } else {
            console.log(err);
            callback({ success: false });
        }
    });
}

function is_exist(data)
{
    return new Promise((resolve,reject)=>{
        conn.query("SELECT * FROM pages_app WHERE user_id = " + data.user_id,function(err,row){
            if(!err && row.length > 0)
            {
                resolve(row[0].id);
            }
            else
            {
                resolve(false);
            }
        })
    })
}
async function upload_app_dealer(data, callback)
{
    var updatedata = [];
    var field = []; var value = [];
    var update = [];
    for (var item in data) {
        field.push(item);
        if (item != 'page_id' && item != "user_id") {
            data[item] = JSON.stringify(data[item]);
            value.push(data[item]);
            update.push(item + "=" + data[item]);
        } else {
            value.push(data[item]);
            update.push(item + "=" + data[item]);
        }
    }
    
    let exist = await is_exist(data);
    if(exist)
    {
        conn.query("UPDATE pages_app SET " + update.join(",") + " WHERE id = " + exist,function(err,row){
            callback({success:true});
        })
    }
    else
    {
        conn.query('INSERT pages_app (' + field.join(',') + ') VALUES(' + value.join(',')  + ')', function(err, row) {
            if (!err) {
                callback({ success: true });
            } else {
                console.log(err);
                callback({ success: false });
            }
        });
    }
    
}

module.exports = {
	new_page: new_page,
    save_page: save_page,
    get_page: get_page,
    save_page_app:save_page_app,
    get_pages: get_pages,
    get_histories: get_histories,
    delete_page: delete_page,
    save_name: save_name,
    save_rating: save_rating,
    upload_dealer: upload_dealer,
	upload_app_dealer: upload_app_dealer
}