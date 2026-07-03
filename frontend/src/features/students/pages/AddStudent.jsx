import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  addStudent,
  updateStudent,
} from "../services/api";
import toast from "react-hot-toast";
import styles from "../styles/AddStudent.module.css";
import Layout from "../../../components/common/Layout";

function AddStudent() {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (location.state?.editing) {
      setEditing(true);
      setForm(location.state.student);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm(initialState);
    setEditing(false);

    navigate("/students", {
      replace: true,
      state: null,
    });
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
    } catch (err) {
      console.error(err);
      toast.error("Operation Failed");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>{editing ? "Update Student" : "Add Student"}</h1>

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
      </div>
    </Layout>
  );
}

export default AddStudent;
