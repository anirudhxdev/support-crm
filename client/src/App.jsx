import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import EditTicket from "./pages/EditTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/tickets" element={<Tickets />} />

        <Route
          path="/tickets/create"
          element={<CreateTicket />}
        />

        <Route
          path="/tickets/edit/:id"
          element={<EditTicket />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;