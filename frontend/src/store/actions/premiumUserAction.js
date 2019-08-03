import axios from 'axios';

const URL = `https://chemalive.propulsion-learn.ch`;

export const get_profile = (profile) => {
    
    return {
        type: 'GET_USER_PROFILE',
        payload: profile
    }
};

export const getUserProfile = () => async (dispatch, getState) => {
    const token = getState().loginReducer.token
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    
    const response = await axios.get(`${URL}/api/users/me/`, config);

    const profile = response.data;
    await dispatch(get_profile(profile));
};

export const getPremium = (id) => async (dispatch, getState) => {
   
    const token = getState().loginReducer.token
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    
    const data = {
        "premium": "True"
    }
    const response = await axios.put(`${URL}/api/users/${id}/profile/`, data, config);

    // const profile = response.data;
    
    // await dispatch(get_profile(profile));
    return response;
}
