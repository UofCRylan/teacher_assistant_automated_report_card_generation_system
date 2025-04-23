import axios from "axios";
import accountManager from "../Managers/AccountManager";

class TeacherHandler {
  getAllTeachers = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/teacher/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accountManager.userToken}`,
        },
      });

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

const teacherHandler = new TeacherHandler();
export default teacherHandler;
