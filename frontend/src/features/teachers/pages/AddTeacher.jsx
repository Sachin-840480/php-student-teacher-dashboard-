import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  addTeacher,
  updateTeacher,
} from "../../../services/api";
import toast from "react-hot-toast";
import styles from "../styles/AddTeacher.module.css";
import Layout from "../../../components/common/Layout";

function AddTeacher() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = {
    teacher_id: "",
    teacher_name: "",
    mobile: "",
    address: "",
    subject: "",
    salary: "",
  };

  const [form, setForm] = useState(initialState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (location.state?.editing) {
      setEditing(true);
      setForm(location.state.teacher);
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

    navigate("/teachers", {
      replace: true,
      state: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateTeacher(form);
        toast.success("Teacher Updated Successfully");
      } else {
        await addTeacher(form);
        toast.success("Teacher Added Successfully");
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

        <h1>{editing ? "Update Teacher" : "Add Teacher"}</h1>

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
      </div>
    </Layout>
  );
}

export default AddTeacher;
