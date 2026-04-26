import { Outlet } from "react-router";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="app-container" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", position: "relative", padding: "1rem" }}>
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default MainLayout;
