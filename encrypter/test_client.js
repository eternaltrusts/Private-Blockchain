
let fs = require('fs');

let request = require('request');


const URL = 'http://localhost:3001';

function encrypt(filename) {
    let req = request.post(URL + '/encrypt', (err, res, body) => {
        if (err) {
            console.log(err)
        } else {
            if (res.statusCode == 200) {
                console.log(body)
            }
        }
    });

    let form = req.form();

    let source_file = fs.createReadStream(filename);

    form.append('source_file', source_file);

}


function decrypt(filename) {

    let req = request.post(URL + '/decrypt', (err, res, body) => {

        if (err) {
            console.log(err)
        } else {
            if (res.statusCode == 200) {
                console.log(body)
            }
        }

    });

    let form = req.form();

    let encrypted_file = fs.createReadStream(filename);

    form.append('encrypted_file', encrypted_file);
}


// encrypt('img.jpg')

// decrypt('img.jpg.enc')