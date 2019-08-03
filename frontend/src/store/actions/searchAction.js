import axios from "axios";

const URL = `https://chemalive.propulsion-learn.ch`;

export const search = (results) => {
    
    return {
        type: 'GET_RESULTS',
        payload: results
    }
};

export const searchAction = (data) => async (
    dispatch,
    getState
  ) => {
    const token = getState().loginReducer.token
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    const response = await axios.get(`${URL}/api/projects/search/?search=${data}`, config);
    dispatch(search(response));
    return response;
  };
  
