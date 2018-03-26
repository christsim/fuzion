import { combineReducers } from "redux";

import web3Reducer from "./web3Reducer";
import participantStoreReducer from "./participantStoreReducer";

export default combineReducers({
    web3Reducer,
    participantStoreReducer
});