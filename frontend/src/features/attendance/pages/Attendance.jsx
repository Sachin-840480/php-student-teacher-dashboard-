import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, markAttendance } from "../services/api";
import styles from "../styles/Attendance.module.css";
import toast from "react-hot-toast";
import Layout from "../../../components/common/Layout";

function Attendance() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await getStudents();

      const data = res.data.map((student) => ({
        student_id: student.student_id,
        student_name: student.student_name,
        status: "Present",
      }));

      setStudents(data);
    } catch {
      toast.error("Unable to Load Students");
    }
  };

  const changeStatus = (index, status) => {
    const copy = [...students];

    copy[index].status = status;

    setStudents(copy);
  };

  const saveAttendance = async () => {
    try {
      const payload = students.map((student) => ({
        student_id: student.student_id,
        attendance_date: date,
        status: student.status,
      }));

      await markAttendance(payload);

      toast.success("Attendance Saved Successfully");
    } catch {
      toast.error("Attendance Save Failed");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Attendance</h1>

        <div className={styles.top}>
          <label>Attendance Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={student.student_id}>
                <td>{student.student_name}</td>

                <td>
                  <select
                    value={student.status}
                    onChange={(e) => changeStatus(index, e.target.value)}
                  >
                    <option>Present</option>

                    <option>Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className={styles.save} onClick={saveAttendance}>
          Save Attendance
        </button>
      </div>
    </Layout>
  );
}

export default Attendance;
