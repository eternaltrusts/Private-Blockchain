

let request = require('request');


const URL = 'http://localhost:3002/transaction';

let time = '2018-08-16T11:18:18.406Z';

let params = '?startDate=' + time;


request.get(URL + params, (err, res, body) => {
    if (err) {
        console.error('===================');
        console.error(err)
    } else {

        // console.log('0')
        if (res.statusCode == 200) {
            // console.log('1')
            let receivedTransactions = JSON.parse(body);
            console.log(receivedTransactions);

        }
    }
});
