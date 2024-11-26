import { Outlet } from "react-router";
import "./App.css";
import "./_template/css/Style.css";

function App() {
  return (
    <div className="App font-inter">
      <Outlet />
    </div>
  );
}

export default App;
