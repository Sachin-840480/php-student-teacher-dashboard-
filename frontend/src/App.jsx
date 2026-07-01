import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import AddTeacher from "./pages/AddTeacher";
import FeeStatus from "./pages/FeeStatus";
import Attendance from "./pages/Attendance";

function App() {

    return (

        <Routes>

            <Toaster position="top-right" />

            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/students" element={<AddStudent />} />

            <Route path="/teachers" element={<AddTeacher />} />

            <Route path="/fees" element={<FeeStatus />} />

            <Route path="/attendance" element={<Attendance />} />

        </Routes>

    );

}

export default App;