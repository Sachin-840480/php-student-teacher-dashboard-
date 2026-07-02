import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../services/api";
import toast from "react-hot-toast";
import styles from "../modules/AddStudent.module.css";
import Layout from "../components/Layout";

function AddStudent() {
  const navigate = useNavigate();
  const initialState = {
    student_id: "",
    student_name: "",
    father_name: "",
    mobile: "",
    alternate_mobile: "",
    address: "",
    activity: "No",
    fee: "",
  };

  const [form, setForm] = useState(initialState);
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast("Unable to load students.");
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
        await updateStudent(form);
        toast.success("Student Updated Successfully");
      } else {
        await addStudent(form);
        toast.success("Student Added Successfully");
      }

      clearForm();
      loadStudents();
    } catch (err) {
      console.error(err);
      toast.error("Operation Failed");
    }
  };

  const handleEdit = (student) => {
    setEditing(true);
    setForm(student);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      console.error(err);
      toast.error("Delete Failed");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Add Student</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div>
              <label>Student Name</label>

              <input
                type="text"
                name="student_name"
                value={form.student_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Father Name</label>

              <input
                type="text"
                name="father_name"
                value={form.father_name}
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
              <label>Alternate Mobile</label>

              <input
                type="text"
                name="alternate_mobile"
                value={form.alternate_mobile}
                onChange={handleChange}
              />
            </div>

            <div className={styles.full}>
              <label>Address</label>

              <textarea
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Activity</label>

              <select
                name="activity"
                value={form.activity}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label>Fee</label>

              <input
                type="number"
                name="fee"
                value={form.fee}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="submit">
              {editing ? "Update Student" : "Add Student"}
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
          <h2>Student List</h2>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Father</th>
                  <th>Mobile</th>
                  <th>Activity</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6">No Students Found</td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.student_id}>
                      <td>{student.student_name}</td>
                      <td>{student.father_name}</td>
                      <td>{student.mobile}</td>
                      <td>{student.activity}</td>
                      <td>₹ {student.fee}</td>

                      <td>
                        <button
                          className={styles.edit}
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className={styles.delete}
                          onClick={() => handleDelete(student.student_id)}
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
      </div>
    </Layout>
  );
}

export default AddStudent;
