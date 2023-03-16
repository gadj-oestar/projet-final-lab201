import "./App.css";
import SignIn from "./outils/signIn/signIn";
import AddData from "./outils/FireBase-Helper/database";
import {Route,Routes,useNavigate}from "react-router-dom"

function App() {
  return (
    <div className="App">
      <SignIn />
      <AddData />
    </div>
  );
}

export default App;
