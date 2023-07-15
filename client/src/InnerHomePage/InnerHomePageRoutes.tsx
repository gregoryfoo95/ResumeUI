import { Route, Routes } from "react-router-dom";
import InnerHomePage from "./InnerHomePage";

export default function InnerHomePageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InnerHomePage />} />
    </Routes>
  );
}