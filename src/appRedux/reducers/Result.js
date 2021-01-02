
const INIT_STATE = {
    loading: true,
    result: [],
    error: ""

}
const fetchResult = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "FETCH_RESULT": {
            return {
                ...state,
                loading: false,
                result: action.payload,
            }
        }
        default:
            return state

    }
}
export default fetchResult;