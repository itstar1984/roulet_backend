var express = require('express');
var route = express.Router();
var user = require('../controller/user');
var page = require('../controller/page');
//
function register(req, res)
{
    /************  Web Route  ***********/
    // User Route
    route.get('/user/login', user.login);
    route.post('/user/register', user.register);
    route.get('/user/get_profile', user.get_profile);
    route.put('/user/update_profile', user.update_profile);
    route.put('/user/update_profile', user.update_profile);
    route.put('/user/reset_password', user.reset_password);
    // Pages Route
    route.post('/page/new_page', page.new_page);
    route.put('/page/save_page', page.save_page);
    route.put('/page/save_page_app',page.save_page_app);
    route.get('/page/get_page', page.get_page);
    route.get('/page/get_pages', page.get_pages);
    route.get('/page/get_histories', page.get_histories);
    route.delete('/page/delete_page', page.delete_page);
    route.put('/page/save_name', page.save_name);
    route.put('/page/save_rating', page.save_rating);
    route.put('/page/upload_dealer', page.upload_dealer);
    
    /************  App Route  ***********/
    // User Route
    route.get('/user/app_login', user.app_login);
    route.post('/user/app_register', user.app_register);
    // Pages Route
    route.post('/page/app_upload_dealer', page.upload_app_dealer);
}

register();

exports.register = route;