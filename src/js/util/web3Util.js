var Web3 = require('web3');
const EventEmitter = require('events');


export function getWeb3() {
    return new Promise((resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener('load', function (dispatch) {
            try {
                // Checking if Web3 has been injected by the browser (Mist/MetaMask)
                if (typeof window.web3 !== 'undefined') {
                    // Use Mist/MetaMask's provider.
                    let web3Injected = new Web3(web3.currentProvider);
                    console.log('Injected web3 detected.');
                    resolve(web3Injected);
                } else {
                    // Fallback to localhost if no web3 injection.
                    var provider = new Web3.providers.HttpProvider('http://localhost:8545');
                    let web3Local = new Web3(provider);
                    console.log('No web3 instance injected, using Local web3.');
                    resolve(web3Local);
                }
            } catch(err) {
                reject(err);
            }
        });
    });
}

export function notifyAccountChanged(web3, accountUpdatedFunction) {
    var curAccounts = [];
    var accountInterval = setInterval(function () {
        web3.eth.getAccounts().then(accounts => {
            if(accounts.length != curAccounts.length || 
                !accounts.every(a => curAccounts.includes(a))) {
                accountUpdatedFunction(accounts);
            }
            curAccounts = accounts;
            return accounts;
        });
    }, 1000);
}

export function notifyBlockNumberChanged(web3, blockNumberUpdatedFunction) {
    var currentblockNumber = null;
    var accountInterval = setInterval(function () {
        web3.eth.getBlockNumber().then(blockNumber => {
            if (currentblockNumber !== blockNumber) {
                currentblockNumber = blockNumber;
                blockNumberUpdatedFunction(blockNumber);
            }
            return blockNumber;
        });
    }, 1000);
}

// get network details that don't require an account
export function getNetworkDetails(web3) {

    return Promise.all(
        [ 
            web3.eth.getBlockNumber()
                .then(blockNumber => { return { blockNumber: blockNumber == 0 ? "0" : blockNumber }}),
            web3.eth.getProtocolVersion()
                .then(protocolVersion => { return { protocolVersion: protocolVersion }}),
            web3.eth.isSyncing()
                .then(isSyncing => { return { isSyncing: isSyncing }}),
            Promise.resolve( { providerConnected: web3.currentProvider.isConnected() })
        ]
    )
    .then(details => { 
        return details.reduce((acc, cur) => Object.assign({}, acc, cur), { });
    });

}


export function getAccountDetails(web3) {

    return web3.eth.getAccounts().then(accounts => { 
        return Promise.all(
            accounts
                .map(account => web3.eth.getBalance(account)
                .then(balance => { 
                    return { 
                        account: account.toLowerCase(), 
                        balance: web3.utils.fromWei(balance, 'ether') 
                    }
                }) 
            )
        )
        .then(details => { 
            return { accounts: details };
        });
    });
    
}