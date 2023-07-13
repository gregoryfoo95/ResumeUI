
import HomePageRoutes from './HomePage/HomePageRoutes';
import AboutMeRoutes from './AboutMePage/AboutMeRoutes';
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
          <Route path="/AboutMe/*" element={<AboutMeRoutes />} />
        )}
      </Routes> 
    </HomePageVisibilityContext.Provider>
  );
}

export default App
