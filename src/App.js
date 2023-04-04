import "./App.css";
import { Route, Routes } from "react-router-dom";

import Artiste from "./componant/pierre de maere";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Artiste />} />
      </Routes>
    </div>
  );
}

export default App;
