import React from "react";
import { connect } from "react-redux";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { 
  removeParticipantFromStoreAction 
} from '../actions/ParticipantStoreActions';


@connect(
  //map to props
  (store) => {
      return {
        accountDetails: store.web3Reducer.accountDetails,
        participantStoreContract: store.participantStoreReducer.participantStoreContract,
        contractOwner: store.participantStoreReducer.contractOwner,
      }
  }
)
export default class Participant extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  removeParticipant(e, account) {
    this.props.dispatch(
        removeParticipantFromStoreAction(
          this.props.participantStoreContract, 
          this.props.accountDetails.accounts[0].account, 
          account)
      );
  }

  render() {
    var isOwner = this.props.accountDetails.accounts && this.props.accountDetails.accounts[0].account == this.props.contractOwner.owner;
    var participantDetails = this.props.participantDetails;
    return (
      <div className="container">
        <div>Account: {participantDetails.account}</div> <div>Name: {participantDetails.name} {isOwner ? <button onClick={e => this.removeParticipant(e, participantDetails.account)}>Remove</button> : ''}</div>
      </div>);
  }
}
