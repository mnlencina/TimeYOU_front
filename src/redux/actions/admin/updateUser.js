import axios from "axios";
import { UPDATE_USER } from "../../actionTypes";

export function updateUser(id,upUser) {
    const endpoint = `https://timeyouback.up.railway.app/updateUser/${id}`;
    return async function (dispatch) {
      try {
        let update = await axios.put(endpoint, upUser);
        console.log(update);
        dispatch({
          type: UPDATE_USER,
          payload: update,
        });
      } catch (error) {
        alert("Verifique los datos");
      }
    };
  }