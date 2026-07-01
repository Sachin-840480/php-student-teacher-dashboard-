import { Link } from "react-router-dom";

import styles from "../modules/Dashboard.css";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className={styles.container}>

            <aside className={styles.sidebar}>

                <h2>Dashboard</h2>

                <Link to="/students">Students</Link>

                <Link to="/teachers">Teachers</Link>

                <Link to="/fees">Fee Status</Link>

                <Link to="/attendance">Attendance</Link>

            </aside>

            <main className={styles.content}>

                <h1>

                    Welcome {user?.user}

                </h1>

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

    );

}

export default Dashboard;