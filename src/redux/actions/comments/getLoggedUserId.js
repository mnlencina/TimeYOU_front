import axios from 'axios';
import { GET_USER_LOGGED } from "../../actionTypes";


export const getLoggedUserId = (email) => async (dispatch) => {

  const URL = `https://timeyouback.up.railway.app/getUserId`
  try {
    const response = await axios.get(URL, { params: {
     email, 
    },});
    console.log("RESPONSE.DATA DE LA ACTION", response.data);
    dispatch({ type:GET_USER_LOGGED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};