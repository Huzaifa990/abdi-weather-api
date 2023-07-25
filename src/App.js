import "./App.css";
import React from "react";
import Forcast from "./Components/Forcast";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>  <Forcast/> </>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
