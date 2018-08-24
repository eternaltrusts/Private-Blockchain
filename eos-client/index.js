
let Eos = require('eosjs');


// const httpEndpoint = 'http://localhost:8888'

const httpEndpoint = 'http://188.116.40.21:18888'

const  keyProvider = process.env.KEY_PROVIDER;

// const eos = Eos({httpEndpoint, keyProvider, chainId});
//const eos = Eos({httpEndpoint, chainId})
const eos = Eos({ httpEndpoint });

eos.getInfo((err, res) => {
    if (err) {
        console.err('==========')
        console.log(err)
    } else {
        console.log(res);
    }
});

