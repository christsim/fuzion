import React from "react";
import { connect } from "react-redux";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { 
  addParticipantToStoreAction 
} from '../actions/ParticipantStoreActions';


@connect(
  //map to props
  (store) => {
      return {
        accountDetails: store.web3Reducer.accountDetails,
        participantStoreContract: store.participantStoreReducer.participantStoreContract,
        addParticipant: store.participantStoreReducer.addParticipant,
        contractOwner: store.participantStoreReducer.contractOwner,
      }
  }
)
export default class AddParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      name: ''
    }
  }

  componentWillMount() {
  }

  setInputValue(e) {
    const name = e.target.name;
    const value = e.target.value;

    var newState = this.state;

    newState[name] = value;
    this.setState(newState);
  }

  addParticipant(e) {
    this.props.dispatch(addParticipantToStoreAction(this.props.participantStoreContract, this.props.accountDetails.accounts[0].account, this.state.account, this.state.name));
  }

  render() {
    var addParticipant = this.props.addParticipant;
 
    return (
      <div className="container">
        <Loading loading={addParticipant.loading}/>
        <Error error={addParticipant.error}/>
        <AddParticipantForm loading={addParticipant.loading} 
                            setInputValue={this.setInputValue.bind(this)} 
                            addParticipant={this.addParticipant.bind(this)}
                            accountDetails={this.props.accountDetails}
                            contractOwner={this.props.contractOwner}
                            />
      </div>);
  }
}

const AddParticipantForm = (props) => {
  if(!props.accountDetails.accounts || props.accountDetails.accounts[0].account != props.contractOwner.owner) {
    return null;
  }

  return (<div className="container">
  <div className="pure-u-1-1">
    <label>Account</label>
    <input type='text' onChange={(e) => props.setInputValue(e)} name="account"/>
    </div>
    <div className="pure-u-1-1">
    <label>Name</label>
    <input type='text' onChange={(e) => props.setInputValue(e)} name="name"/>
    </div>
    <button onClick={(e) => props.addParticipant(e)}>Add</button>
  </div>);
}