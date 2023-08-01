import axios from "axios";
import { UPDATE_WATCH } from "../../actionTypes";

export function updateWatch(id,upWatch) {
    const endpoint = `https://timeyouback.up.railway.app/admin/update-watch/${id}`;
    return async function (dispatch) {
      try {
        let update = await axios.put(endpoint, upWatch);
        console.log(update);
        dispatch({
          type: UPDATE_WATCH,
          payload: update,
        });
      } catch (error) {
        alert("Verifique los datos");
      }
    };
  }