
const initialState = {};

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_ERROR':
            console.log(action.payload.data)
            return {
                ...state,
                error_message: action.payload.data
            };
    
        default:
            return state;
    }
    
  
};
