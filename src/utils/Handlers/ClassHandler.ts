import axios from "axios";
import accountManager from "../Managers/AccountManager";

class ClassHandler {
  createClass = accountManager.requireAuth(async (data: object) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/class/`,
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
  });

  editClass = accountManager.requireAuth(
    async (id: number, section_id: number) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/class/${id}?section=${section_id}`
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

  getAllClasses = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/class/`, {
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

  getClass = accountManager.requireAuth(
    async (id: number, section_id: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/class/${id}/section/${section_id}`
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

  getStudents = accountManager.requireAuth(
    async (id: number, section_id: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/class/${id}/section/${section_id}/students`
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

  getAllStudents = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/student/`);

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

  getClassrooms = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/class/rooms`,
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

const classHandler = new ClassHandler();
export default classHandler;
