import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { notifyBlockNumberChanged, notifyAccountChanged } from "../util/web3Util";
import { Loading } from "./Loading";
import { Error } from "./Error";

export default class Web3DetailsExample extends React.Component {

    render() {
        var web3 = this.props.web3;

        if(!web3) {
            return <div>Web3 not installed.</div>
        } else if(web3.loading) {
            return (<div>Loading</div>);
        } else if (web3.error) {
            return (<div>Unable to get web3: {web3.error.toString()}</div>)
        } else {
            return (
            <div>
                <h1>Web3 {this.props.web3.version}</h1>
                <div>{this.props.web3.error}</div>

                <div><NetworkDetails networkDetails={this.props.networkDetails }/></div>
                <div><AccountDetails accountDetails={this.props.accountDetails }/></div>
            </div>)
        }
    }    
}

const NetworkDetails = (props) => {
    var networkDetails = props.networkDetails;

    if(networkDetails) {
        return (
            <div>
                <Loading loading={networkDetails.loading}/>
                <Error error={networkDetails.error}/>
                <div>
                    <div>Block Number: {networkDetails.blockNumber}</div>
                    <div>Protocol Version: {networkDetails.protocolVersion}</div>
                    <div>Is Syncing: {networkDetails.isSyncing ? networkDetails.isSyncing : "false"}</div>
                    <div>Provider Connected: {networkDetails.providerConnected ? "true" : "false"}</div>
                </div>
            </div>
        );
    } else {
        return (<div>Not connected to network.</div>);
    }

}

const AccountDetails = (props) => {
    var accountDetails = props.accountDetails;

    if(!accountDetails) {
        return <div>No account selected.</div>
    } else if(accountDetails.loading) {
        return (<div>Loading</div>);
    } else if (accountDetails.error) {
        return (<div>Unable to get account details: {accountDetails.error.toString()}</div>)
    } else if (!accountDetails.accounts || accountDetails.accounts.length == 0) {
        return <div>No account selecteds.</div>
    } else {
        return (<div>
            {accountDetails.accounts.map(ad => 
                (<div key={ad.account}>
                    <div>Account: {ad.account}</div>
                    <div>Balance: {ad.balance}</div>
                </div>)
            )}
        </div>)
    }
}
