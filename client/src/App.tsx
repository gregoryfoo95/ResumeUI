import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import InnerHomePageRoutes from "./InnerHomePage/InnerHomePageRoutes";
import { hasSeenIntro } from "./components/introSeen";
import "./App.css";

// First visit in a tab session goes through the intro, even via a direct /Home link.
// After the intro is finished or skipped, /Home (and reloads of it) work normally.
function RequireIntro({ children }: { children: JSX.Element }): JSX.Element {
  return hasSeenIntro() ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/Home/*"
        element={
          <RequireIntro>
            <InnerHomePageRoutes />
          </RequireIntro>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
