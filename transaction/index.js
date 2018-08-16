
let express = require('express');

let http = require('http');

let request = require('request');

let app = express()

const PORT = 3002;

// const HIPERLEDGER_URL = 'http://localhost:3000/';
const HIPERLEDGER_URL = 'http://localhost:3000/api/EternalTrustsTransaction';

app.get('/transaction', (req, resClient) => {

    let startDate = req.query.startDate;

    let startTime = new Date(startDate).getTime()

    console.log(startDate);


    request.get(HIPERLEDGER_URL, (err, res, body) => {

        if (err) {
            console.error(err);
        } else {
            if (res.statusCode == 200) {

                let transactions = JSON.parse(body);
                let filteredTransactions = []

                // transactions.filter()
                for (let i = 0; i < transactions.length; i++) {
                    let transaction = transactions[i];
                    let time = new Date(transaction['timestamp']).getTime();

                    if (time >= startTime) {
                        filteredTransactions.push(transaction);
                    }
                }
                // console.log(transactions.length);
                resClient.send(filteredTransactions);
            }
        }
    });

});


http.createServer(app).listen(PORT);


// let time = '2018-08-10T09:37:23.149Z';
// let time2 = '2018-08-10T09:37:25.149Z';

// let date = new Date(time);
// let date2 = new Date(time2);

// console.log(date.getMonth())
// console.log(date.getYear())
// console.log(date.getHours())
// console.log(date.getMinutes())
// console.log(date.getSeconds())

