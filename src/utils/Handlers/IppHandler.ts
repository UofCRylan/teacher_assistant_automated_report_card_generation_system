import axios from "axios";
import accountManager from "../Managers/AccountManager";

class IppHandler {
  createIpp = accountManager.requireAuth(async (studentID: number) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/student/${studentID}/ipp/`,
        null,
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
  });

  editIpp = accountManager.requireAuth(async (studentID: number) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/student/${studentID}/ipp/`,
        null,
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
  });

  getStudentsIpp = accountManager.requireAuth(async (studentID: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/student/${studentID}/ipp`,
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
  });

  getSpecificStudentIpp = accountManager.requireAuth(
    async (studentID: number, teacherID: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/student/${studentID}/ipp/${teacherID}`,
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

  getTeachersIpp = accountManager.requireAuth(async (teacherID: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/teacher/${teacherID}/ipp`,
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
  });

  getAIpp = accountManager.requireAuth(async (ipp: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/student/ipp/${ipp}`
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

const ippHandler = new IppHandler();
export default ippHandler;
