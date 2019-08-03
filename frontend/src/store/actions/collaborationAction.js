import axios from 'axios';

import {get_list} from './projectAction';
import { getProjectProfile } from './projectAction';

const URL = `https://chemalive.propulsion-learn.ch`;

export const sendInvite = (info) => async (dispatch, getState) => {
    const token = getState().loginReducer.token;
    const config = {
        headers : {
            Authorization : `Bearer ${token}`,
        }
    };
    const id = info.project_id
    const data = {
        "collaborator": info.collaborator
    }
    // second argument should be DATA, then CONFIG, DATA can be empty string or must be an object
    const response = await axios.post(`${URL}/api/projects/${id}/collaboration/`, data, config);
    await dispatch(get_list());
    
    return response;
  
  }

  export const deleteCollaboration = (id, project_id) => async (dispatch, getState) => {
   
    const token = getState().loginReducer.token;
    const config = {
        headers : {
            Authorization : `Bearer ${token}`,
        }
    };
    
    // second argument should be DATA, then CONFIG, DATA can be empty string or must be an object
    const response = await axios.delete(`${URL}/api/collaborations/${id}/`, config);
    await dispatch(getProjectProfile(project_id));
    return response;
  }