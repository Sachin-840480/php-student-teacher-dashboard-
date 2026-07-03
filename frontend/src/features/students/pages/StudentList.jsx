import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../../../components/common/Layout";
import styles from "../styles/StudentList.module.css";

import {
  getStudents,
  deleteStudent,
} from "../services/api";

function StudentList() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load students.");
    }
  };

  // Search
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const keyword = search.toLowerCase();

      return (
        student.student_name?.toLowerCase().includes(keyword) ||
        student.father_name?.toLowerCase().includes(keyword) ||
        student.mobile?.includes(keyword)
      );
    });
  }, [students, search]);

  // Pagination
  const totalPages = Math.ceil(
    filteredStudents.length / recordsPerPage
  );

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirst,
    indexOfLast
  );

  const handleEdit = (student) => {
    navigate("/students", {
      state: {
        student,
        editing: true,
      },
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      toast.success("Student deleted successfully");

      loadStudents();
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

        <h1>Student List</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Name, Father Name or Mobile..."
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
                  <th>Father</th>
                  <th>Mobile</th>
                  <th>Activity</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      No Students Found
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student) => (
                    <tr key={student.student_id}>
                      <td>{student.student_name}</td>

                      <td>{student.father_name}</td>

                      <td>{student.mobile}</td>

                      <td>{student.activity}</td>

                      <td>₹ {student.fee}</td>

                      <td>
                        <button
                          className={styles.edit}
                          onClick={() =>
                            handleEdit(student)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className={styles.delete}
                          onClick={() =>
                            handleDelete(student.student_id)
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

export default StudentList;
