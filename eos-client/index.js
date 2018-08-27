
let Eos = require('eosjs');


// const httpEndpoint = 'http://localhost:8888'
const httpEndpoint = 'http://188.116.40.21:18888'

const keyProvider = process.env.KEY_PROVIDER;
// const keyProvider = '5K8M91MRX48reKwk18gAAv7PB3HrvoMhHoHMxByKbiAfWGesbTu'

// const eos = Eos({httpEndpoint, keyProvider, chainId});
const eos = Eos({ httpEndpoint, keyProvider });
//const eos = Eos({httpEndpoint, chainId})
// const eos = Eos({ httpEndpoint });

eos.getInfo((err, res) => {
    if (err) {
        console.err('==========')
        console.log(err)
    } else {
        console.log(res);
    }
});


let transaction_result = eos.transaction(
    {
        actions: [
            {
                account: 'et.hl',
                name: 'addtrx',
                authorization: [{
                    actor: 'et.hl',
                    permission: 'active'
                }],
                data: {
                    account: 'et.hl',
                    transaction_id: 'transactionid'

                }
            }]
    },
    (err, res) => {
        console.log('res', res)
    }
)


//  console.log(transaction_result)

