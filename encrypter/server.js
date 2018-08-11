let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');

let app = express();

// app.use(bodyParser.raw({
//   type: function(req) {
//     return 'raw';
//   }
// }));

let fs = require('fs');

let crypto = require('crypto');

let multipart = require('connect-multiparty');

let multipartMiddleware = multipart();

const ALGORITHM = 'aes-256-cbc';

const KEY = process.env.ETHERNAL_TRUSTS_KEY;

app.get('/encrypt', (req, resp) => {

    resp.send('Use POST request to encrypt file')

});


app.post('/encrypt', multipartMiddleware, function (req, resp) {

    // console.log(req.files);

    let path = req.files.sourceFile.path;

    let originalFilename = req.files.sourceFile.originalFilename

    var source = fs.createReadStream(path, {root: __dirname});
    
    let encryptedFilename = originalFilename + '.enc'

    let cipher = crypto.createCipher(ALGORITHM, KEY);

    let encrypted = fs.createWriteStream(encryptedFilename);

    source.pipe(cipher).pipe(encrypted);

    encrypted.on('finish', function () {
        console.log('Encrypted file written to disk!');
    });

    resp.sendFile(encryptedFilename, { root: __dirname })

    //TODO delete all req.files when done

});

app.get('/decrypt', (req, resp) => {

    resp.send('Use POST request to decrypt file')

});


app.post('/decrypt', multipartMiddleware, function (req, resp) {

    let path = req.files.encryptedFile.path;

    let encryptedFilename = req.files.sourceFile.originalFilename

    var encrypted = fs.createReadStream(path, {root: __dirname});
    
    let decryptedFilename = encryptedFilename.replace('enc', '')

    let decipher = crypto.createDecipher(ALGORITHM, KEY);

    let decrypted = fs.createWriteStream(decryptedFilename);

    encrypted.pipe(decipher).pipe(decrypted);

    decrypted.on('finish', function () {
        console.log('Decrypted file written to disk!');
    });

    resp.sendFile(decryptedFilename, { root: __dirname })

});

http.createServer(app).listen(3001);



// var server = require('http').createServer();

// var io = require('socket.io')(server);

// io.on('connection', function (client) {

//     client.on('event', function (data) {
//         console.log(data);
//      });
//     client.on('disconnect', function () { 
//         console.log('disconnect');
//     });
// });

// server.listen(3000);

// var http = require('http'),
//     fileSystem = require('fs'),
//     path = require('path');

// http.createServer(function (request, response) {

//     var filePath = path.join(__dirname, 'img.jpg');
//     var stat = fileSystem.statSync(filePath);

//     response.writeHead(200, {
//         'Content-Type': 'image/jpg',
//         'Content-Length': stat.size
//     });

//     var readStream = fileSystem.createReadStream(filePath);
//     // We replaced all the event handlers with a simple call to readStream.pipe()
//     readStream.pipe(response);

// }).listen(2000);
