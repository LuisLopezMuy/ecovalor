import { BrowserRouter, Routes, Route } from "react-router";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Scan from "./pages/Scan";
import ScanResult from "./pages/ScanResult";
import Centers from "./pages/Centers";
import CenterDetail from "./pages/CenterDetail";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import MainLayout from "./pages/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas sin Layout */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Rutas con Layout (Navbar presente) */}
        <Route element={<MainLayout />}>
          <Route path="/scan" element={<Scan />} />
          <Route path="/scan/result" element={<ScanResult />} />

          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:id" element={<CenterDetail />} />

          <Route path="/community" element={<Community />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Ruta 404 para cualquier otra URL */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
