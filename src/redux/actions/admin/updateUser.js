import axios from "axios";
import { UPDATE_USER } from "../../actionTypes";

export function updateUser(id,upUser) {
    const endpoint = `http://timeyouback.up.railway.app/admin/updateUser/${id}`;
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