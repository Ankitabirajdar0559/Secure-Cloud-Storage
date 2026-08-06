import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/Sidebar.css";


export default function Sidebar() {


    const { logout } = useAuth();

    const navigate = useNavigate();



    const handleLogout = () => {

        logout();

        navigate("/login");

    };



    return (

        <aside className="sidebar">


            <div className="sidebar-logo">

                ☁ CloudBox

            </div>




            <nav className="sidebar-menu">


                <NavLink to="/dashboard">

                    🏠 Dashboard

                </NavLink>



                <NavLink to="/files">

                    📁 My Files

                </NavLink>



                <NavLink to="/upload">

                    ⬆ Upload

                </NavLink>



                <NavLink to="/profile">

                    👤 Profile

                </NavLink>



            </nav>





            <div className="sidebar-bottom">


                <button
                className="logout-btn"
                onClick={handleLogout}
                >

                    Logout

                </button>


            </div>



        </aside>

    );

}