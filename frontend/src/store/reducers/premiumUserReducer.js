const initialState = {}


export const premiumUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            
            return {
                ...state,
                profile: action.payload,
                premiumUser: action.payload.user_profile.premium
            };
    
        default:
            return state;
    }
}