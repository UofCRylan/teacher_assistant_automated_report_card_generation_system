import axios from "axios";
import accountManager from "../Managers/AccountManager";

class FeedbackHandler {
  updateFeedback = accountManager.requireAuth(
    async (classID: number, data: Object) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/class/${classID}/feedback`
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
    async (classID: number, studentID: number) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/classes/${classID}/students/${studentID}/feedback`
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

  getAllFeedback = accountManager.requireAuth(async (classID: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/class/${classID}/feedback/`
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

const feedbackHandler = new FeedbackHandler();
export default feedbackHandler;
