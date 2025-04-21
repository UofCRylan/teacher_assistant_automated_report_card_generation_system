import axios from "axios";
import accountManager from "../Managers/AccountManager";

class GradeHandler {
  updateGrades = accountManager.requireAuth(
    async (classID: number, sectionID: number, data: object) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/class/${classID}/section/${sectionID}/grade`,
          data,
          {
            headers: {
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

  updateGrade = accountManager.requireAuth(
    async (
      classID: number,
      sectionID: number,
      studentID: number,
      data: object
    ) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/class/${classID}/section/${sectionID}/students/${studentID}/grade`,
          data,
          {
            headers: {
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

  getGrade = accountManager.requireAuth(
    async (classID: number, sectionID: number, studentID: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/class/${classID}/section/${sectionID}/students/${studentID}/grade`
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

  getAllGrades = accountManager.requireAuth(
    async (classID: number, sectionID: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/class/${classID}/section/${sectionID}/grade`,
          {
            headers: {
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
}

const gradeHandler = new GradeHandler();
export default gradeHandler;
