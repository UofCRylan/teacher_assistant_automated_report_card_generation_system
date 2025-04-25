import axios from "axios";
import accountManager from "../Managers/AccountManager";
import { toast } from "react-toastify";

class ReportHandler {
  getReportCard = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/report/`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accountManager.userToken}`,
        },
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ReportCard.pdf");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      return { status: 200 };
    } catch (error) {
      return { error: error };
    }
  });

  checkStudentReportCardStatus = accountManager.requireAuth(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/report/status`,
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

  checkTeacherReportCardStatus = accountManager.requireAuth(
    async (classID, section) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/report/status?class_id=${classID}&section=${section}`,
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
}

const reportHandler = new ReportHandler();
export default reportHandler;
