import axios from "axios";
import accountManager from "../Managers/AccountManager";

class AttendanceHandler {
  updateGrade = accountManager.requireAuth(
    async (classID: number, data: Object) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/class/${classID}/grade/`
        );

        return {
          status: 200,
          data: response.data,
        };
      } catch (error) {
        return {
          error: error,
        };
      }
    }
  );

  getGrade = accountManager.requireAuth(async (classID: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/class/${classID}/grade/`
      );

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

  getAllGrades = accountManager.requireAuth(async (classID: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/class/${classID}/grades`
      );

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

const attendanceHandler = new AttendanceHandler();
export default attendanceHandler;
