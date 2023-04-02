import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Artiste from "./componant/pierre de maere";
function App() {
  const [affiche, setAffiche] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Artiste />} />
      </Routes>
    </div>
  );
}

export default App;
