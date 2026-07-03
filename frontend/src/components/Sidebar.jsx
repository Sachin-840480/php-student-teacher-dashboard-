import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  List,
} from "lucide-react";

import styles from "../modules/Sidebar.module.css";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/students")) {
      setMenu("students");
    } else if (location.pathname.startsWith("/teachers")) {
      setMenu("teachers");
    } else {
      setMenu("");
    }
  }, [location.pathname]);

  const toggleMenu = (value) => {
    setMenu((prev) => (prev === value ? "" : value));
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

        <NavLink to="/dashboard" onClick={() => setOpen(false)}>
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        {/* Students */}

        <div className={styles.menuItem}>
          <div className={styles.menuHeader}>
            <button
              className={styles.menuLink}
              onClick={() => {
                navigate("/students");
                setOpen(false);
              }}
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

          <div
            className={`${styles.subMenuWrapper} ${
              menu === "students" ? styles.open : ""
            }`}
          >
            <NavLink
              to="/students/list"
              className={({ isActive }) =>
                `${styles.subMenu} ${isActive ? styles.activeSubMenu : ""}`
              }
              onClick={() => setOpen(false)}
            >
              <List size={16} />
              <span>Student List</span>
            </NavLink>
          </div>
        </div>

        {/* Teachers */}

        <div className={styles.menuItem}>
          <div className={styles.menuHeader}>
            <button
              className={styles.menuLink}
              onClick={() => {
                navigate("/teachers");
                setOpen(false);
              }}
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

          <div
            className={`${styles.subMenuWrapper} ${
              menu === "teachers" ? styles.open : ""
            }`}
          >
            <NavLink
              to="/teachers/list"
              className={({ isActive }) =>
                `${styles.subMenu} ${isActive ? styles.activeSubMenu : ""}`
              }
              onClick={() => setOpen(false)}
            >
              <List size={16} />
              <span>Teacher List</span>
            </NavLink>
          </div>
        </div>

        <NavLink to="/fees" onClick={() => setOpen(false)}>
          <Wallet size={18} />
          <span>Fee Status</span>
        </NavLink>

        <NavLink to="/attendance" onClick={() => setOpen(false)}>
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
