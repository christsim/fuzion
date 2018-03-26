
const initialState = {
    participantStoreContract: null,
    participantAccounts: null,
    addParticipant: {},
    removeParticipant: {},
    contractOwner: {}
};

// dont mutate state!!
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "GET_PARTICIPANT_STORE_CONTRACT_PENDING":
            return {...state, participantStoreContract: { loading: true } };
        case "GET_PARTICIPANT_STORE_CONTRACT_FULFILLED":
            return {...state, participantStoreContract: { ...action.payload, loading: false, error: null}};
        case "GET_PARTICIPANT_STORE_CONTRACT_REJECTED":
            return {...state, participantStoreContract: { loading: false, error: action.payload }};

        case "GET_PARTICIPANT_STORE_ACCOUNTS_PENDING":
            return {...state, participantAccounts: { loading: true } };
        case "GET_PARTICIPANT_STORE_ACCOUNTS_FULFILLED":
            return {...state, participantAccounts: { ...action.payload, loading: false, error: null}};
        case "GET_PARTICIPANT_STORE_ACCOUNTS_REJECTED":
            return {...state, participantAccounts: { loading: false, error: action.payload }};

        case "GET_PARTICIPANT_STORE_OWNER_PENDING":
            return {...state, contractOwner: { loading: true } };
        case "GET_PARTICIPANT_STORE_OWNER_FULFILLED":
            return {...state, contractOwner: { ...action.payload, loading: false, error: null}};
        case "GET_PARTICIPANT_STORE_OWNER_REJECTED":
            return {...state, contractOwner: { loading: false, error: action.payload}};            


        case "ADD_PARTICIPANT_STORE_ACCOUNT_PENDING":
            return {...state, addParticipant: { loading: true } };
        case "ADD_PARTICIPANT_STORE_ACCOUNT_FULFILLED":
            return {...state, addParticipant: { ...action.payload, loading: false, error: null}};
        case "ADD_PARTICIPANT_STORE_ACCOUNT_REJECTED":
            return {...state, addParticipant: { loading: false, error: action.payload}};             

        case "REMOVE_PARTICIPANT_STORE_ACCOUNT_PENDING":
            return {...state, removeParticipant: { loading: true } };
        case "REMOVE_PARTICIPANT_STORE_ACCOUNT_FULFILLED":
            return {...state, removeParticipant: { ...action.payload, loading: false, error: null}};
        case "REMOVE_PARTICIPANT_STORE_ACCOUNT_REJECTED":
            return {...state, removeParticipant: { loading: false, error: action.payload}};            
            
        default:
            return state;
    }
}

