import axios from "axios";
import accountManager from "../Managers/AccountManager";

class ScheduleHandler {
  updateSchedule = accountManager.requireAuth(
    async (scheduleID: number, data) => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/schedule/${scheduleID}`,
          data,
          {
            headers: { Authorization: `Bearer ${accountManager.userToken}` },
          }
        );

        return response;
      } catch (error) {
        console.log(error);
        return {
          message: error.response.data.error,
          status: error.status,
        };
      }
    }
  );

  getUserSchedule = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/schedule/`, {
        headers: { Authorization: `Bearer ${accountManager.userToken}` },
      });

      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.response.data.error,
        status: error.status,
      };
    }
  });

  getSchedule = accountManager.requireAuth(async (scheduleID: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/schedule/${scheduleID}`,
        {
          headers: { Authorization: `Bearer ${accountManager.userToken}` },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.response.data.error,
        status: error.status,
      };
    }
  });

  getAllSchedules = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/schedule/all`,
        {
          headers: { Authorization: `Bearer ${accountManager.userToken}` },
        }
      );

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
