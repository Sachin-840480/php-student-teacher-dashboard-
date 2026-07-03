import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import styles from "../../modules/FeeStatus.module.css";

function FeeTable({ fees, handleStudent }) {
  const [search, setSearch] = useState("");

  const filteredFees = useMemo(() => {
    return fees.filter((student) =>
      student.student_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [fees, search]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatCurrency = (amount) => {
    return `₹ ${Number(amount).toLocaleString("en-IN")}`;
  };

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableHeader}>
        <div>
          <h2>Student Fee Details</h2>
          <p>View and manage student fee payments.</p>
        </div>

        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Total Fee</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Status</th>
              <th align="center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredFees.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.empty}>
                  No students found.
                </td>
              </tr>
            ) : (
              filteredFees.map((student) => (
                <tr key={student.student_id}>
                  <td>
                    <div className={styles.student}>
                      <div className={styles.avatar}>
                        {getInitials(student.student_name)}
                      </div>

                      <div>
                        <h4>{student.student_name}</h4>

                        <span>ID : {student.student_id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{formatCurrency(student.total_fee)}</td>

                  <td>{formatCurrency(student.paid_fee)}</td>

                  <td>{formatCurrency(student.pending_fee)}</td>

                  <td>
                    <span
                      className={
                        Number(student.pending_fee) <= 0
                          ? styles.paidBadge
                          : styles.pendingBadge
                      }
                    >
                      {Number(student.pending_fee) <= 0
                        ? "Paid"
                        : "Pending"}
                    </span>
                  </td>

                  <td className={styles.actionCell}>
                    <button
                      className={styles.payBtn}
                      onClick={() => handleStudent(student)}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <span>
          Showing {filteredFees.length} of {fees.length} students
        </span>
      </div>
    </div>
  );
}

export default FeeTable;
