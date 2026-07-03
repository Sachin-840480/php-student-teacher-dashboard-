import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./features/auth/pages/Login";
import Dashboard from "./features/dashboard/pages/Dashboard";
import AddStudent from "./features/students/pages/AddStudent";
import StudentList from "./features/students/pages/StudentList";
import AddTeacher from "./features/teachers/pages/AddTeacher";
import TeacherList from "./features/teachers/pages/TeacherList";
import FeeStatus from "./features/fees/pages/FeeStatus";
import Attendance from "./features/attendance/pages/Attendance";

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
