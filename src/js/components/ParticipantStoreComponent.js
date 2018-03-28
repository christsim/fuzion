import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { 
  getParticipantStoreContractAction, 
  getParticipantStoreAccountsAction, 
  getParticipantStoreOwnerAction
} from '../actions/ParticipantStoreActions';
import { Loading } from "./Loading";
import { Error } from "./Error";
import AddParticipant from './AddParticipantComponent';
import Participant from './ParticipantComponent';

@connect(
  //map to props
  (store) => {
      return {
        accountDetails: store.web3Reducer.accountDetails,
        participantStoreContract: store.participantStoreReducer.participantStoreContract,
        participantAccounts: store.participantStoreReducer.participantAccounts,
        contractOwner: store.participantStoreReducer.contractOwner,
      }
  }
)
export default class ParticipantStoreComponent extends React.Component {

  componentWillMount() {
    
    store.dispatch(getParticipantStoreContractAction(this.props.web3))
      .then(getParticipantStoreContractAction => getParticipantStoreContractAction.action.payload)
      .then(contract => {
        if(this.props.accountDetails.accounts) {
          store.dispatch(getParticipantStoreAccountsAction(contract, this.props.accountDetails.accounts[0].account));
        }
        store.dispatch(getParticipantStoreOwnerAction(contract));
      });
  }

  render() {
    var participantStoreContract =this.props.participantStoreContract;

    if(participantStoreContract) {
      return (
        <div class="panel panel-default">
          <div class="panel-heading">
              <h2 class="panel-title">Pariticipant Store Contract</h2>
          </div>
          <div class="panel-body">
            <Loading loading={participantStoreContract.loading}/>
            <Error error={participantStoreContract.error}/>
            <div class="well">Contract address: {participantStoreContract.address}</div>
            <ParticipantContractOwner contractOwner={this.props.contractOwner}/>
            <ParticipantAccounts participantAccounts={this.props.participantAccounts}/>
            <AddParticipant/>
          </div>
        </div>
      );
    } else {
      return (<div>Participant Contract not found.</div>);
    }

  }
}

const ParticipantContractOwner = (props) => {
  var contractOwner = props.contractOwner;

  return (
    <div class="well">
      <Loading loading={contractOwner.loading}/>
      <Error error={contractOwner.error}/>
      <div>Owner: {contractOwner.owner} </div>
    </div>
  );  

}

const ParticipantAccounts = (props) => {
  var participantAccounts = props.participantAccounts;

  if(participantAccounts) {
    var participantDetails = participantAccounts.participantDetails || [];
    return (
      <div>
          <h3>Accounts</h3>
          <Loading loading={participantAccounts.loading}/>
          <Error error={participantAccounts.error}/>
          <table class="table"> 
            <thead>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
            </thead>
            <tbody>
            { participantDetails.map(a => <Participant participantDetails={a}/> ) }
            </tbody>
          </table>
      </div>
    );  
  } else {
    return (<div>No participants loaded.</div>)
  }

}