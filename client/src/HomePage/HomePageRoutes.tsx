import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

export default function HomePageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
;