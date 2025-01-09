import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const OrdersAdminPage = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1 relative">
                <Header/>
            </div>
        </div>
    );
    }