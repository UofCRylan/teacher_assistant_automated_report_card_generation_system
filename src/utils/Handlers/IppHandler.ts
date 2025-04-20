import axios from "axios";
import accountManager from "../Managers/AccountManager";

class IppHandler {
  editIpp = accountManager.requireAuth(async (studentID: number) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/student/${studentID}/ipp/`
      );
      console.log("Responded: ", response);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  });

  getIpp = accountManager.requireAuth(async (studentID: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/student/${studentID}/ipp/`
      );
      console.log("Responded: ", response);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  });
}

const ippHandler = new IppHandler();
export default ippHandler;
