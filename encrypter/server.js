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

const PORT = 3001;

app.get('/', (req, res) => {

    const URL = "http://188.116.40.21";
    // const URL = "http://127.0.0.1";

    // const PORT = 3001;

    const INFO = `<h1>Encrypter</h1>
                    <p>Use POST request to encrypt/decrypt your data</p>
                        <li>To encrypt: ${URL}:${PORT}/encrypt </li>
                        <li>To decrypt: ${URL}:${PORT}/decrypt </li>`;

    res.send(INFO);

});

app.get('/encrypt', (req, resp) => {

    resp.send('Use POST request to encrypt file')

});


app.post('/encrypt', multipartMiddleware, function (req, resp) {

    // console.log(req.files);

    let path = req.files.sourceFile.path;

    let originalFilename = req.files.sourceFile.originalFilename

    var source = fs.createReadStream(path, { root: __dirname });

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

    var encrypted = fs.createReadStream(path, { root: __dirname });

    let decryptedFilename = encryptedFilename.replace('enc', '')

    let decipher = crypto.createDecipher(ALGORITHM, KEY);

    let decrypted = fs.createWriteStream(decryptedFilename);

    encrypted.pipe(decipher).pipe(decrypted);

    decrypted.on('finish', function () {
        console.log('Decrypted file written to disk!');
    });

    resp.sendFile(decryptedFilename, { root: __dirname })

});

http.createServer(app).listen(PORT, () => {
    console.log('Encrypter is running...')
});

