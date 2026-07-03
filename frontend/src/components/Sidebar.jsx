// import { X } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import styles from "../modules/Sidebar.module.css";

// import {
//   Home,
//   Users,
//   UserCog,
//   Wallet,
//   CalendarCheck,
//   LogOut,
// } from "lucide-react";

// function Sidebar({ open, setOpen }) {
//   return (
//     <>
//       <div
//         className={`${styles.overlay} ${open ? styles.showOverlay : ""}`}
//         onClick={() => setOpen(false)}
//       />

//       <aside
//         className={`${styles.sidebar}
//             ${open ? styles.show : ""}`}
//       >
//         <button className={styles.close} onClick={() => setOpen(false)}>
//           <X size={22} />
//         </button>

//         <h2>Dashboard</h2>

//         <NavLink to="/dashboard">
//           <Home size={18} />
//           <span>Home</span>
//         </NavLink>

//         <NavLink to="/students">
//           <Users size={18} />
//           <span>Students</span>
//         </NavLink>

//         <NavLink to="/teachers">
//           <UserCog size={18} />
//           <span>Teachers</span>
//         </NavLink>

//         <NavLink to="/fees">
//           <Wallet size={18} />
//           <span>Fee Status</span>
//         </NavLink>

//         <NavLink to="/attendance">
//           <CalendarCheck size={18} />
//           <span>Attendance</span>
//         </NavLink>

//         <button className={styles.logout}>
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;



import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  UserCog,
  Wallet,
  CalendarCheck,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

import styles from "../modules/Sidebar.module.css";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const [menu, setMenu] = useState("");

  const toggleMenu = (value) => {
    setMenu(menu === value ? "" : value);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.showOverlay : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        <button className={styles.close} onClick={() => setOpen(false)}>
          <X size={22} />
        </button>

        <h2>Dashboard</h2>

        <NavLink to="/dashboard">
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        {/* Students */}

        <div className={styles.menuItem}>
          <div className={styles.menuHeader}>
            <button
              className={styles.menuLink}
              onClick={() => navigate("/students")}
            >
              <Users size={18} />
              <span>Students</span>
            </button>

            <button
              className={styles.arrow}
              onClick={() => toggleMenu("students")}
            >
              {menu === "students" ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>

          {menu === "students" && (
            <NavLink
              to="/students/list"
              className={styles.subMenu}
            >
              Student List
            </NavLink>
          )}
        </div>

        {/* Teachers */}

        <div className={styles.menuItem}>
          <div className={styles.menuHeader}>
            <button
              className={styles.menuLink}
              onClick={() => navigate("/teachers")}
            >
              <UserCog size={18} />
              <span>Teachers</span>
            </button>

            <button
              className={styles.arrow}
              onClick={() => toggleMenu("teachers")}
            >
              {menu === "teachers" ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>

          {menu === "teachers" && (
            <NavLink
              to="/teachers/list"
              className={styles.subMenu}
            >
              Teacher List
            </NavLink>
          )}
        </div>

        <NavLink to="/fees">
          <Wallet size={18} />
          <span>Fee Status</span>
        </NavLink>

        <NavLink to="/attendance">
          <CalendarCheck size={18} />
          <span>Attendance</span>
        </NavLink>

        <button className={styles.logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
