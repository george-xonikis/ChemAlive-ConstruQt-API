import axios from "axios";

const URL = `https://chemalive.propulsion-learn.ch`;
//const URL = `http://localhost:8090`;

export const get_list = projects => {
  return {
    type: "GET_PROJECTS",
    payload: projects
  };
};

export const getProjectsList = () => async (dispatch, getState) => {
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${URL}/api/projects/user/`, config);

  const projects = response.data;

  dispatch(get_list(projects));
};

export const get_project = project => {
  return {
    type: "GET_PROJECT",
    payload: project
  };
};

export const getProjectProfile = id => async (dispatch, getState) => {
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${URL}/api/projects/${id}/`, config);

  const project = response.data;

  await dispatch(get_project(project));
};

export const newProject = data => async (dispatch, getState) => {
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // second argument should be DATA, then CONFIG, DATA can be empty string
  const response = await axios.post(
    `${URL}/api/projects/create/`,
    data,
    config
  );
  await dispatch(get_list());

  return response;
};

export const deleteProject = id => async (dispatch, getState) => {
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // second argument should be DATA, then CONFIG, DATA can be empty string
  const response = await axios.delete(`${URL}/api/projects/${id}/`, config);
  //await dispatch(get_list());
  return response;
};

export const saveProject = (id, smiles) => async (dispatch, getState) => {
  console.log('from action')
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const data = {
    smile: smiles
  };
  //second argument should be DATA, then CONFIG, DATA can be empty string
  const response = await axios.put(`${URL}/api/projects/${id}/`, data, config);
  // await dispatch(get_project(id));
  await dispatch(get_list());
  console.log(response);
  return response;
};
