import axios from "axios";
import accountManager from "../Managers/AccountManager";

class FeedbackHandler {
  updateFeedback = accountManager.requireAuth(
    async (
      classID: number,
      sectionID: number,
      studentID: number,
      data: object
    ) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/class/${classID}/section/${sectionID}/students/${studentID}/feedback`,
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

  getFeedback = accountManager.requireAuth(
    async (classID: number, sectionID: number, studentID: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/class/${classID}/section/${sectionID}/students/${studentID}/feedback`,
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

  getAllFeedback = accountManager.requireAuth(
    async (classID: number, sectionID: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/class/${classID}/section/${sectionID}/feedback`,
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

const feedbackHandler = new FeedbackHandler();
export default feedbackHandler;
