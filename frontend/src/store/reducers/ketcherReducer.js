const initialState = {
    // height: '100%',
    // width: '50%',
    smiles: ''

}

export const ketcherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW':
            
            return {
                ...state,
                height: '100%',
                width: '50%'
            };
        case 'HIDE':
            return {
                ...state,
                height: '0',
                width: '0'
            }

        case 'SAVE':
            console.log(action.payload)
            return {
                ...state,
                // height: '100%',
                // width: '50%',
                smiles: action.payload
            }
    
        default:
            return state;
    }
}