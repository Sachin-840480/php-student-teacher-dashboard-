import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../../../components/common/Layout";
import styles from "../styles/TeacherList.module.css";

import {
  getTeachers,
  deleteTeacher,
} from "../../../services/api";

function TeacherList() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load teachers.");
    }
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const keyword = search.toLowerCase();

      return (
        teacher.teacher_name?.toLowerCase().includes(keyword) ||
        teacher.mobile?.includes(keyword) ||
        teacher.subject?.toLowerCase().includes(keyword)
      );
    });
  }, [teachers, search]);

  const totalPages = Math.ceil(
    filteredTeachers.length / recordsPerPage
  );

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentTeachers = filteredTeachers.slice(
    indexOfFirst,
    indexOfLast
  );

  const handleEdit = (teacher) => {
    navigate("/teachers", {
      state: {
        teacher,
        editing: true,
      },
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await deleteTeacher(id);
      toast.success("Teacher deleted successfully");
      loadTeachers();
    } catch (err) {
      console.error(err);
      toast.error("Delete Failed");
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

        <h1>Teacher List</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Name, Mobile or Subject..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
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
                {currentTeachers.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      No Teachers Found
                    </td>
                  </tr>
                ) : (
                  currentTeachers.map((teacher) => (
                    <tr key={teacher.teacher_id}>
                      <td>{teacher.teacher_name}</td>

                      <td>{teacher.mobile}</td>

                      <td>{teacher.subject}</td>

                      <td>₹ {teacher.salary}</td>

                      <td>
                        <button
                          className={styles.edit}
                          onClick={() =>
                            handleEdit(teacher)
                          }
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

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    className={
                      currentPage === index + 1
                        ? styles.activePage
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default TeacherList;
