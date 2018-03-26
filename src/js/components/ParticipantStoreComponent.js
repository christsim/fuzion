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
        <div>
          <Loading loading={participantStoreContract.loading}/>
          <Error error={participantStoreContract.error}/>
          <div>Contract address: {participantStoreContract.address}</div>
          <ParticipantAccounts participantAccounts={this.props.participantAccounts}/>
          <ParticipantContractOwner contractOwner={this.props.contractOwner}/>
          <AddParticipant/>
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
    <div>
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
        <Loading loading={participantAccounts.loading}/>
        <Error error={participantAccounts.error}/>
        <ul> Accounts:
          { participantDetails.map(a => <li key={a.account} ><Participant participantDetails={a}/> </li>) }
        </ul>
      </div>
    );  
  } else {
    return (<div>No participants loaded.</div>)
  }

}