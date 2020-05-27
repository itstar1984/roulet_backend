const https = require('https');
const fs = require('fs');
const options = {
    cert: fs.readFileSync('./ssl/STAR_bigdata666_com.crt'),
    ca: fs.readFileSync('./ssl/STAR_bigdata666_com.ca-bundle'),
    key: fs.readFileSync('./ssl/myserver.key'),
};
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var route = require('./route');
var path = require('path');
const cors = require('cors');
const multer = require('multer');

const user_avatar = multer.diskStorage({
    destination: "./upload/users/",
    filename: function(req, file, cb){
       cb(null,"avatar-" + Date.now() + path.extname(file.originalname));
    }
});

const dealer_avatar = multer.diskStorage({
    destination: "./upload/dealers/",
    filename: function(req, file, cb){
       cb(null,"dealer-" + Date.now() + path.extname(file.originalname));
    }
});

const user_upload = multer({storage: user_avatar});
const dealer_upload = multer({storage: dealer_avatar});

app.use(bodyparser.json({
    urlencoded:false
}))
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-timebase"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(express.static('./'));
app.use('/api', route.register);

const httpsServer = https.createServer(options, app);
  
app.listen(5000, () => {
    console.log('HTTP Server running on port 5000');
});
  
// httpsServer.listen(5000, () => {
//     console.log('HTTPS Server running on port 5000');
// });


app.post('/api/user_image', user_upload.single('fileImg'), function(req, res, next) {
    res.json({success: true, file: 'upload/users/' + req.file.filename});
})

app.post('/api/dealer_image', dealer_upload.single('fileImg'), function(req, res, next) {
    res.json({success: true, file: 'upload/dealers/' + req.file.filename});
})

app.post('/api/get_time', function(req, res) {
    res.json({success: true, time: new Date()})
})