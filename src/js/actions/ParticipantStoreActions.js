import {
    getParticipantStoreContract,
    getParticipantStoreAccounts,
    addParticipantStoreAccount,
    removeParticipantFromStore,
    getParticipantStoreOwner
} from "../util/participantStoreUtil";

export function getParticipantStoreContractAction(web3) {
    return {
        type: "GET_PARTICIPANT_STORE_CONTRACT",
        payload: getParticipantStoreContract(web3)
    }
}

export function getParticipantStoreAccountsAction(contract, fromAccount) {
    return {
        type: "GET_PARTICIPANT_STORE_ACCOUNTS",
        payload: getParticipantStoreAccounts(contract, fromAccount)
    }
}

export function getParticipantStoreOwnerAction(contract) {
    return {
        type: "GET_PARTICIPANT_STORE_OWNER",
        payload: getParticipantStoreOwner(contract)
    }
}

export function addParticipantToStoreAction(contract, fromAccount, account, name) {
    return {
        type: "ADD_PARTICIPANT_STORE_ACCOUNT",
        payload: addParticipantStoreAccount(contract, fromAccount, account, name)
    }
}

export function removeParticipantFromStoreAction(contract, fromAccount, account, name) {
    return {
        type: "REMOVE_PARTICIPANT_STORE_ACCOUNT",
        payload: removeParticipantFromStore(contract, fromAccount, account)
    }
}