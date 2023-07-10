import { Route, Routes } from "react-router-dom";
import AboutMePage from "./AboutMePage";

export default function AboutMeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AboutMePage />} />
    </Routes>
  );
}