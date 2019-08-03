import axios from 'axios';

const URL = `https://chemalive.propulsion-learn.ch`;

export const sendCode = (data) => async (dispatch, getState) => {

    const config = {
        headers: ''
        
      };
    
    // second argument should be DATA, then CONFIG, DATA can be empty string
    const response = await axios.post(`${URL}/api/registration/`, data, config);
    //await dispatch(get_list());
    console.log(response)
    return response;
  
  }

export const handleError = (error) => {
    return {
        type: 'SUBMIT_ERROR',
        payload: error
      }   
}


export const sendData = data => async (dispatch, getState) => {
    try {
        const config = {
            headers: ''
          };
        
        // second argument should be DATA, then CONFIG, DATA can be empty string
        const response = await axios.post(`${URL}/api/registration/validation/`, data, config);
        //await dispatch(get_list());
        console.log(response)
        return response;
    } catch (error) {
        console.log(error.response)
        // contains the response with error message from backend
        dispatch(handleError(error.response));
        
    }
  
}
  
  