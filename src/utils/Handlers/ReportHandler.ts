import axios from "axios";
import accountManager from "../Managers/AccountManager";

class ReportHandler {
  getReportCard = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/student/report`
      );
      console.log("Responded: ", response);
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

  checkReportCardStatus = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/student/report/status`
      );
      console.log("Responded: ", response);
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

const reportHandler = new ReportHandler();
export default reportHandler;
