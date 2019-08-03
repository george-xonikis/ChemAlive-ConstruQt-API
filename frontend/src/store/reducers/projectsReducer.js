
const initialState = {
    projectsList: [],
    projectProfile: {},
    collaborators: [],
    smiles: '',
    search_results: []
   
};


export const projectsReducer = (state=initialState, action) => {
    
    switch (action.type) {    
        case 'GET_PROJECTS':
            return {
                ...state,
                projectsList: action.payload
               
            };

        case 'GET_PROJECT':
            return {
                ...state,
                projectProfile: action.payload,
                collaborators: action.payload.collaborators,
                smiles: action.payload.smile
            };

        case 'GET_RESULTS':
            return {
                ...state,
                search_results: action.payload.data
            }

        default:
            return state;
    }
};
