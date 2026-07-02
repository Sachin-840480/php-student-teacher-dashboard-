import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styles from "../modules/Layout.module.css";
import Footer from "./Footer";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar open={open} setOpen={setOpen} />

      <div className={styles.main}>
        <Navbar setOpen={setOpen} />

        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
