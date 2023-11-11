// import styles from './styles.module.css'
import { Outlet } from "react-router-dom"; //Outlet lets us render the elements within each other
import { Link } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";

const Main = () => {

    // const handleLogout = () => {
    //     localStorage.removeItem("token")
    //     window.location.reload();
    // }
    return (
        // <div className={styles.main_container}>
        //     <nav className={styles.navbar}>
        //         <h1>Facebook</h1>
        //         <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
        //     </nav>
        // </div>

        // <div>
        //     <div></div>
        //     {/* <nav className={styles.navbar}> */}
        //     <nav>
        //         <h1>Facebook</h1>
        //         {/* <button className={styles.white_btn} onClick={handleLogout}>Logout</button> */}
        //         <button>Logout</button>
        //     </nav>

        // </div>

        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="p-4 w-screen">
            {/* <div className="bg-teal-200">header</div> */}
            <Header />
            <div>{<Outlet />}</div> 
            </div>
            
        </div>
    )
};


export default Main;
