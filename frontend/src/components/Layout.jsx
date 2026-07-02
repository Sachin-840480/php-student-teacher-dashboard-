import Navbar from "./Navbar";

import styles from "../modules/Layout.module.css";

function Layout({ children }) {
    return (
        <div className={styles.layout}>

            <div className={styles.main}>

                <Navbar />

                <div className={styles.content}>
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Layout;
