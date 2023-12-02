import * as types from "./actionTypes";
const initialState1 = {
    Contact: [],
    isLoading: false,
    isError: false,
  };

export const reducer = (state = initialState1, action) => {
    const { type, payload } = action;
    switch (type) {
      case types.GET_CONTACT_REQUEST:
      case types.POST_CONTACT_REQUEST:
      case types.DELETE_CONTACT_REQUEST:  
      case types.EDIT_CONTACT_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case types.GET_CONTACT_SUCCESS:
      case types.POST_CONTACT_SUCCESS:
        case types.DELETE_CONTACT_SUCCESS:  
        case types.EDIT_CONTACT_SUCCESS: 
        return {
          ...state,
          Contact: payload,
          isLoading: false,
          isError: false,
        };
      case types.GET_CONTACT_FAILURE:
      case types.POST_CONTACT_FAILURE:
        case types.DELETE_CONTACT_FAILURE:  
        case types.EDIT_CONTACT_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
  
  
      default:
        return state;
    }
  };