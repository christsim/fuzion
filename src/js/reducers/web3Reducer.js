
const initialState = {
    web3: null,
    networkDetails: null,
    accountDetails: {},
};

// dont mutate state!!
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "GET_WEB3_PENDING":
            return {...state, web3: { loading: true } };
        case "GET_WEB3_FULFILLED":
            return {...state, web3: { ...action.payload, loading: false, error: null}};
        case "GET_WEB3_REJECTED":
            return {...state, web3: { loading: false, error: action.payload }};

        case "GET_WEB3_NETWORK_DETAILS_PENDING":
            return {...state, networkDetails: { loading: true } };
        case "GET_WEB3_NETWORK_DETAILS_FULFILLED":
            return {...state, networkDetails: { ...action.payload, loading: false, error: null}};
        case "GET_WEB3_NETWORK_DETAILS_REJECTED":
            return {...state, networkDetails: { loading: false, error: action.payload}};

        case "GET_WEB3_ACCOUNT_DETAILS_PENDING":
            return {...state, accountDetails: { loading: true } };
        case "GET_WEB3_ACCOUNT_DETAILS_FULFILLED":
            return {...state, accountDetails: { ...action.payload, loading: false, error: null}};
        case "GET_WEB3_ACCOUNT_DETAILS_REJECTED":
            return {...state, accountDetails: { loading: false, error: action.payload}};

        default:
            return state;
    }
}

