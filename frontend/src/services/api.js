import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


// ---------------- LOGIN ----------------

export const login = (data) =>
    api.post("/login.php", data);


// ---------------- STUDENTS ----------------

export const getStudents = () =>
    api.get("/students.php");

export const getStudent = (id) =>
    api.get(`/students.php?id=${id}`);

export const addStudent = (data) =>
    api.post("/students.php", data);

export const updateStudent = (data) =>
    api.put("/students.php", data);

export const deleteStudent = (id) =>
    api.delete(`/students.php?id=${id}`);


// ---------------- TEACHERS ----------------

export const getTeachers = () =>
    api.get("/teachers.php");

export const getTeacher = (id) =>
    api.get(`/teachers.php?id=${id}`);

export const addTeacher = (data) =>
    api.post("/teachers.php", data);

export const updateTeacher = (data) =>
    api.put("/teachers.php", data);

export const deleteTeacher = (id) =>
    api.delete(`/teachers.php?id=${id}`);


// ---------------- FEES ----------------

export const getFeeStatus = () =>
    api.get("/fees.php");

export const addFeePayment = (data) =>
    api.post("/fees.php", data);


// ---------------- ATTENDANCE ----------------

export const getAttendance = () =>
    api.get("/attendance.php");

export const markAttendance = (data) =>
    api.post("/attendance.php", data);

export const faceAttendance = (formData) =>
    api.post("/faceAttendance.php", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export default api;
