import useAuth from "../hooks/useAuth";
import "../css/Navbar.css";

export default function Navbar() {

    const { user } = useAuth();

    return (

        <header className="navbar">

            <div>

                <h2>

                    Welcome,

                    {" "}

                    {user?.name || "User"}

                    👋

                </h2>

                <p>

                    Secure Cloud Storage Dashboard

                </p>

            </div>

            <div className="profile-mini">

                <div className="avatar">

                    {user?.name?.charAt(0).toUpperCase()}

                </div>

                <div>

                    <strong>

                        {user?.name}

                    </strong>

                    <p>

                        {user?.email}

                    </p>

                </div>

            </div>

        </header>

    );

}