
let express = require('express');

let http = require('http');

let request = require('request');

let app = express()

const URL = "http://188.116.40.21";

const PORT = 3002;

const HIPERLEDGER_URL = `${URL}:3000/api/EternalTrustsTransaction`;

app.get('/', (req, res) => {

    const MAIN_PAGE = `
    <h1>Server is working</h1>

    <li>Usage:</li>
        ${URL}:${PORT}/transaction?startDate=[time]
    
    <li>Example to use:</li>
    
        ${URL}:${PORT}/transaction?startDate=2018-08-17T08:33:52.376Z
    
    `

    res.send(MAIN_PAGE);
});

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


http.createServer(app).listen(PORT, () => {
    console.log('Server is running');
});

