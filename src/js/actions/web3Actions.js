import {
    getWeb3,
    getAccountDetails,
    getNetworkDetails
} from "../util/web3Util";

export function getWeb3Action() {
    return {
        type: "GET_WEB3",
        payload: getWeb3()
    }
}

export function getWeb3AccountDetailsAction(web3) {
    return {
        type: "GET_WEB3_ACCOUNT_DETAILS",
        payload: getAccountDetails(web3)
    }
}

export function getWeb3NetworkDetailsAction(web3) {
    return {
        type: "GET_WEB3_NETWORK_DETAILS",
        payload: getNetworkDetails(web3)
    }
}