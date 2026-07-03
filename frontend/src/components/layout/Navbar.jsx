import { Menu } from "lucide-react";
import styles from "../modules/Navbar.module.css";

function Navbar({ setOpen }) {

    return(

        <header className={styles.navbar}>

            <button
                className={styles.menuBtn}
                onClick={()=>setOpen(true)}
            >

                <Menu size={24}/>

            </button>

            <h2>School Management</h2>

        </header>

    );

}

export default Navbar;