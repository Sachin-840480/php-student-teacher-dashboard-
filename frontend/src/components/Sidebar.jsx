import { NavLink } from "react-router-dom";

import styles from "../modules/Sidebar.module.css";

function Sidebar() {

    return (

        <aside className={styles.sidebar}>

            <h2>Dashboard</h2>

            <NavLink to="/dashboard">
                Home
            </NavLink>

            <NavLink to="/students">
                Students
            </NavLink>

            <NavLink to="/teachers">
                Teachers
            </NavLink>

            <NavLink to="/fees">
                Fee Status
            </NavLink>

            <NavLink to="/attendance">
                Attendance
            </NavLink>

        </aside>

    );

}

export default Sidebar;
