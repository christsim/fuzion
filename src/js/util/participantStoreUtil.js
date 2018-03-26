var Web3 = require('web3');
import ParticipantStore from '../../../build/contracts/ParticipantStore.json';
import truffleContract from "truffle-contract";

export function getParticipantStoreContract(web3) {
    var contract = truffleContract(ParticipantStore);
    
    contract.setProvider(web3.currentProvider);
    return contract.deployed().then(deployed => {
        return deployed;
    })
}

export function getParticipantStoreAccounts(contract, fromAccount) {
    return contract.getParticipantAccounts({from: fromAccount}).then(accounts => {
        var getParticipantPromises = accounts
            .map(a => contract.getParticipant(a, {from: fromAccount})
                .then(p => {
                    return {
                        account: a.toLowerCase(),
                        name: toAscii(p[1]),
                        creationTime: p[2]
                    }
                })
            );

        return Promise.all(getParticipantPromises).then(participantDetails => { return {participantDetails: participantDetails}});
    });
}

export function getParticipantStoreOwner(contract) {
    return contract.owner().then(owner => {
        return {
            owner: owner.toLowerCase()
        }
    });
}

export function addParticipantStoreAccount(contract, fromAccount, account, name) {
    return contract.addParticipant(account, name, {from: fromAccount});
}

export function removeParticipantFromStore(contract, fromAccount, account) {
    return contract.removeParticipant(account, {from: fromAccount});
}

function toAscii(hex) {
    var str = '',
      i = 0,
      l = hex.length;
    if (hex.substring(0, 2) === '0x') {
      i = 2;
    }
    for (; i < l; i += 2) {
      var code = parseInt(hex.substr(i, 2), 16);
      if (code === 0) continue; // this is added
      str += String.fromCharCode(code);
    }
    return str;
  };