import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../css/dashboard.css";

export default function DashboardLayout({ children }) {
    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Navbar />

                <main className="dashboard-content">
                    {children}
                </main>

            </div>

        </div>
    );
}