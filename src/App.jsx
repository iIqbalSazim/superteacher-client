import { BrowserRouter, Route, Routes } from "react-router-dom";

import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import Landing from "./Pages/Landing/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:role" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
