
import HomePageRoutes from './HomePage/HomePageRoutes';
import InnerHomePageRoutes from './InnerHomePage/InnerHomePageRoutes';
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import './App.css';

export const HomePageVisibilityContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

function App() {
  const [homePageVisibility, setHomePageVisibility] = useState(true);
  console.log(homePageVisibility);
  return (
    <HomePageVisibilityContext.Provider value={setHomePageVisibility}>
      <Routes>
        {homePageVisibility ? (
          <Route path="/*" element={<HomePageRoutes/>} />
        ) : (
          <>
            <Route path="/*" element={<HomePageRoutes/>} />
            <Route path="/Home/*" element={<InnerHomePageRoutes />} />
          </>
        )}
      </Routes> 
    </HomePageVisibilityContext.Provider>
  );
}

export default App
