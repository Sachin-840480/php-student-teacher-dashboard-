import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import AddTeacher from "./pages/AddTeacher";
import TeacherList from "./pages/TeacherList";
import FeeStatus from "./pages/FeeStatus";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/students" element={<AddStudent />} />
        <Route path="/students/list" element={<StudentList />} />
       
        <Route path="/teachers" element={<AddTeacher />} />
        <Route path="/teachers/list" element={<TeacherList />} />
        
        <Route path="/fees" element={<FeeStatus />} />

        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </>
  );
}

export default App;
