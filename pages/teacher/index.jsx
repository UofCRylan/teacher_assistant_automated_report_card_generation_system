import React from "react";
import TeacherScheduleView from "@/src/components/pages/general/TeacherScheduleView.tsx";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler";
import Layout from "../../src/components/layout/Layout";

const TeacherHome = () => {
  const [schedule, setSchedule] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await scheduleHandler.getUserSchedule();

      if (result.status === 200) {
        setSchedule(result.data);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Home</h1>
      {schedule !== undefined ? (
        <TeacherScheduleView schedule={schedule} />
      ) : (
        <span>Loading...</span>
      )}
    </main>
  );
};

TeacherHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherHome;
