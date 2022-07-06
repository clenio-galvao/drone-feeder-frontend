import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Deliveries, Drones, Menu } from "./pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Drones />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="*" element={<Drones />} />
      </Routes>
    </BrowserRouter>
  );
}
