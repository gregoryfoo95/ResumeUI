import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import InnerHomePageRoutes from "./InnerHomePage/InnerHomePageRoutes";
import "./App.css";

// Both routes are always registered so /Home survives a reload or a direct visit.
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Home/*" element={<InnerHomePageRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
