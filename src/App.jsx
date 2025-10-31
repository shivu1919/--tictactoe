import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HumanVsHuman from "./pages/HumanVsHuman";
import HumanVsComp from "./pages/HumanVsComp";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/vsHuman" element={<HumanVsHuman/>}/>
          <Route path="/vsComputer" element={<HumanVsComp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}