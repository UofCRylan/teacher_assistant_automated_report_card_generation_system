import axios from "axios";
import accountManager from "../Managers/AccountManager";

class AttendanceHandler {
  updateAttendance = accountManager.requireAuth(
    async (id: number, section_id: number, data) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/class/${id}/section/${section_id}/attendance`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accountManager.userToken}`,
            },
          }
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

  getAttendance = accountManager.requireAuth(
    async (id: number, section_id: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/class/${id}/section/${section_id}/attendance`
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

  getAttendanceRecords = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/class/attendance`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accountManager.userToken}`,
          },
        }
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
