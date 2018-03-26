import React, { Children } from "react";
import { connect } from "react-redux";
import { 
    getWeb3Action, 
    getWeb3AccountDetailsAction,
    getWeb3NetworkDetailsAction,
} from "../actions/web3Actions";
import store from "../store";
import { notifyBlockNumberChanged, notifyAccountChanged } from "../util/web3Util";

@connect(
    //map to props
    (store) => {
        return {
            web3: store.web3Reducer.web3,
            networkDetails: store.web3Reducer.networkDetails,
            accountDetails: store.web3Reducer.accountDetails,
        }
    }
)
export default class Web3Provider extends React.Component {

    componentWillMount() {
        store.dispatch(getWeb3Action())
            .then(web3Action => web3Action.action.payload)
            .then(web3 => {
                store.dispatch(getWeb3NetworkDetailsAction(web3));

                notifyAccountChanged(web3, (accounts => {
                    store.dispatch(getWeb3AccountDetailsAction(web3));
                }));
                notifyBlockNumberChanged(web3, (blockNumber => {
                    store.dispatch(getWeb3NetworkDetailsAction(web3));
                }));
            });
    }

    render() {
        if(
            (this.props.web3 && !this.props.web3.loading) &&
            (this.props.networkDetails && !this.props.networkDetails.loading) &&
            (this.props.accountDetails && !this.props.accountDetails.loading)
        ) {
            const { children } = this.props;
    
            var childrenWithProps = React.Children.map(children, child =>
                React.cloneElement(child, { ...this.props }));
        
            return <div>{childrenWithProps}</div>
        } else {
            return <div>Loading...</div>
        }
    } 
}