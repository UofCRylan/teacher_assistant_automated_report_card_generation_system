import axios from "axios";
import accountManager from "../Managers/AccountManager";

class ScheduleHandler {
  createSchedule = accountManager.requireAuth(async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/schedule`, {
        headers: { Authorization: `Bearer ${accountManager.userToken}` },
      });
      console.log("Info Responded: ", response);

      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.response.data.error,
        status: error.status,
      };
    }
  });

  editSchedule = accountManager.requireAuth(async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/schedule`, {
        headers: { Authorization: `Bearer ${accountManager.userToken}` },
      });
      console.log("Info Responded: ", response);

      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.response.data.error,
        status: error.status,
      };
    }
  });

  getSchedule = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/schedule`, {
        headers: { Authorization: `Bearer ${accountManager.userToken}` },
      });
      console.log("Info Responded: ", response);

      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.response.data.error,
        status: error.status,
      };
    }
  });
}

const scheduleHandler = new ScheduleHandler();
export default scheduleHandler;
