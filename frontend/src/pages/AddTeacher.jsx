import { useEffect, useState } from "react";
import {
  addTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
} from "../services/api";

import styles from "./AddTeacher.module.css";

function AddTeacher() {
  const initialState = {
    teacher_id: "",
    teacher_name: "",
    mobile: "",
    address: "",
    subject: "",
    salary: "",
  };

  const [form, setForm] = useState(initialState);
  const [teachers, setTeachers] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load teachers.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm(initialState);
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateTeacher(form);
        alert("Teacher Updated Successfully");
      } else {
        await addTeacher(form);
        alert("Teacher Added Successfully");
      }

      clearForm();
      loadTeachers();
    } catch (err) {
      console.error(err);
      alert("Operation Failed");
    }
  };

  const handleEdit = (teacher) => {
    setEditing(true);
    setForm(teacher);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await deleteTeacher(id);
      loadTeachers();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Teacher</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label>Teacher Name</label>

            <input
              type="text"
              name="teacher_name"
              value={form.teacher_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Mobile</label>

            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Subject</label>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Salary</label>

            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          <div className={styles.full}>
            <label>Address</label>

            <textarea
              rows="3"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button type="submit">
            {editing ? "Update Teacher" : "Add Teacher"}
          </button>

          {editing && (
            <button
              type="button"
              className={styles.cancel}
              onClick={clearForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className={styles.tableContainer}>
        <h2>Teacher List</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Subject</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="5">No Teachers Found</td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.teacher_id}>
                  <td>{teacher.teacher_name}</td>
                  <td>{teacher.mobile}</td>
                  <td>{teacher.subject}</td>
                  <td>₹ {teacher.salary}</td>

                  <td>
                    <button
                      className={styles.edit}
                      onClick={() => handleEdit(teacher)}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.delete}
                      onClick={() =>
                        handleDelete(teacher.teacher_id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddTeacher;
