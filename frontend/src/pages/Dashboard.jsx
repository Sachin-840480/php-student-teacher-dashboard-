import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "../modules/Dashboard.module.css";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.content}>
          <h1>Welcome {user?.user}</h1>

          <div className={styles.cards}>
            <Link className={styles.card} to="/students">
              Add Student
            </Link>

            <Link className={styles.card} to="/teachers">
              Add Teacher
            </Link>

            <Link className={styles.card} to="/fees">
              Fee Status
            </Link>

            <Link className={styles.card} to="/attendance">
              Attendance
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Dashboard;
