import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 relative">
        <Header />
      </div>
    </div>
  );
}
