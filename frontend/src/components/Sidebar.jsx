import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "../modules/Sidebar.module.css";

function Sidebar({ open,setOpen }) {

    return(

        <>

        <div

            className={`${styles.overlay} ${
                open ? styles.showOverlay : ""
            }`}

            onClick={()=>setOpen(false)}

        />

        <aside

            className={`${styles.sidebar}
            ${open ? styles.show : ""}`}

        >

            <button

                className={styles.close}

                onClick={()=>setOpen(false)}

            >

                <X size={22}/>

            </button>

            <h2>Dashboard</h2>

            <NavLink to="/dashboard">Home</NavLink>

            <NavLink to="/students">Students</NavLink>

            <NavLink to="/teachers">Teachers</NavLink>

            <NavLink to="/fees">Fee Status</NavLink>

            <NavLink to="/attendance">Attendance</NavLink>

        </aside>

        </>

    );

}

export default Sidebar;