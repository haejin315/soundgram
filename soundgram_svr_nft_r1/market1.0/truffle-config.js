const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const NETWORK_ID = '1001'
const GASLIMIT = '20000000'
const URL = `https://api.baobab.klaytn.net:8651`
const PRIVATE_KEY = '0x95344c6b2fd3246158bc04d562bfaa44fe56a795c352bf420a66e51fd0795c85'
const config = {
  accessKeyId: "KASKE371R6CEN79Y0P1BVHIW",
  secretAccessKey: "-olZWq3qoviWnTNjf7X4TmdSKkdaZnrXAEuEnFFZ"
}
module.exports = {
  networks: {  
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id 
    },

    klaytn: {
        provider: new HDWalletProvider(PRIVATE_KEY, URL),
        network_id: NETWORK_ID, // Baobab network id
        gas: 20000000, // transaction gas limit
        gasPrice: null, // gasPrice of Baobab is 25 Gpeb
    },
    cypress: {
      provider: new HDWalletProvider(PRIVATE_KEY, "https://public-node-api.klaytnapi.com/v1/cypress"),
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(config.accessKeyId + ":" + config.secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          PRIVATE_KEY,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
  },
  compilers: {
    solc: {
      version: "0.5.6"    // Specify compiler's version to 0.5.6
    },
  }
}