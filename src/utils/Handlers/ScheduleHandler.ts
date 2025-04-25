import axios from "axios";
import accountManager from "../Managers/AccountManager";

class ScheduleHandler {
  createSchedule = accountManager.requireAuth(
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
        return {
          error: error,
        };
      }
    }
  );

  editSchedule = accountManager.requireAuth(
    async (scheduleID: number, data) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/schedule/${scheduleID}`,
          data,
          {
            headers: { Authorization: `Bearer ${accountManager.userToken}` },
          }
        );

        return response;
      } catch (error) {
        return {
          error: error,
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
      return {
        error: error,
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
      return {
        error: error,
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
      return {
        error: error,
      };
    }
  });
}

const scheduleHandler = new ScheduleHandler();
export default scheduleHandler;
