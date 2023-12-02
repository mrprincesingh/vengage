import * as types from "./actionTypes";
import axios from "axios";

export const getAllContact = (searchQuery="") => (dispatch) => {
    dispatch({type: types.GET_CONTACT_REQUEST});
    return axios
    .get(`https://vengage.vercel.app/api/v1/contact?search=${searchQuery}`)
    .then((res) => {
        dispatch({type: types.GET_CONTACT_SUCCESS, payload: res.data});
   
    })
    .catch((e) => {
        dispatch({type: types.GET_CONTACT_FAILURE, payload: e});
    });
};
export const postContact = ({ firstName, lastName, email, phone }) => (dispatch) => {
    console.log(firstName, lastName, email, phone);
    dispatch({ type: types.POST_CONTACT_REQUEST });
  
    return axios
      .post(`https://vengage.vercel.app/api/v1/addcontact`, { firstName, lastName, email, phone })
      .then((res) => {
        dispatch({ type: types.POST_CONTACT_SUCCESS, payload: res.data });
      })
      .catch((e) => {
        console.error('Error response from server:', e.response.data); // Log the error response from the server
        dispatch({ type: types.POST_CONTACT_FAILURE, payload: e.response.data, isError: true });
      });
  };

  export const deletecontact = (id) => (dispatch) => {
   
    dispatch({ type: types.DELETE_CONTACT_REQUEST });
  
    return axios
      .delete(`https://vengage.vercel.app/api/v1/delete/${id}`)
      .then((res) => {
        // Check the structure of the response from the server
        dispatch({ type: types.DELETE_CONTACT_SUCCESS, payload: res.data });
        console.log(res.data);
      })
      .catch((e) => {
        dispatch({ type: types.DELETE_CONTACT_FAILURE, payload: e });
      });
  };

  export const editContact = (id, { firstName, lastName, email, phone }) => (dispatch) => {
    dispatch({ type: types.EDIT_CONTACT_REQUEST });
  
    return axios
      .put(`https://vengage.vercel.app/api/v1/editcontact/${id}`, { firstName, lastName, email, phone })
      .then((res) => {
        // Check the structure of the response from the server
        dispatch({ type: types.EDIT_CONTACT_SUCCESS, payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: types.EDIT_CONTACT_FAILURE, payload: e });
      });
  };
