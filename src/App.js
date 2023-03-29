import { Route, Routes } from "react-router-dom";
import TestEntry from "./Components/Forms/TestEntry/TestEntry";
import Chart from "./Pages/Chart/Chart";
import Home from "./Pages/Home/Home";
import List from "./Pages/List/List";
import Update from "./Pages/List/Update";
import Building from "./Pages/ManualForms/Building";
import LeaseApartment from "./Pages/ManualForms/LeaseApartment";
import Tools from "./Pages/Tools/Tools";
// import Routes from "./Routes";
function App() {
  return (
    // h-[95vh] overflow-y-auto overflow-x-hidden
    <div className="App ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/testentry" element={<TestEntry />} />
        <Route path="/building" element={<Building />} />
        <Route path="/LeaseApartment" element={<LeaseApartment />} />
        <Route path="/testentry" element={<TestEntry />} />
        <Route path="/list/:name" element={<List />} />
        <Route path="/update/:name/:id" element={<Update />} />
        <Route path="/chart/:name" element={<Chart />} />
        {/* <Route path="/tools/:name" element={<Tools />} /> */}
      </Routes>
      {/* <Routes /> */}
    </div>
  );
}

export default App;
