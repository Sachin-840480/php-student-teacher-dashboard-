import styles from "../../modules/FeeStatus.module.css";

function FeePaymentForm({
  form,
  fees,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className={styles.paymentCard}>
      <div className={styles.cardHeader}>
        <h2>Add Fee Payment</h2>
        <p>Select a student and record a payment.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label>Student</label>

            <select
              name="student_id"
              value={form.student_id}
              disabled
            >
              <option value="">Select Student</option>

              {fees.map((student) => (
                <option
                  key={student.student_id}
                  value={student.student_id}
                >
                  {student.student_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Total Fee</label>

            <input
              type="text"
              value={
                form.total_fee
                  ? `₹ ${Number(form.total_fee).toLocaleString("en-IN")}`
                  : ""
              }
              readOnly
            />
          </div>

          <div>
            <label>Paid Amount</label>

            <input
              type="number"
              name="paid_fee"
              value={form.paid_fee}
              onChange={handleChange}
              placeholder="Enter Paid Amount"
              required
            />
          </div>

          <div>
            <label>Payment Date</label>

            <input
              type="date"
              name="payment_date"
              value={form.payment_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.full}>
            <label>Remarks</label>

            <textarea
              rows="4"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              placeholder="Optional remarks..."
            />
          </div>
        </div>

        <div className={styles.buttonArea}>
          <button
            type="submit"
            className={styles.saveBtn}
            disabled={!form.student_id}
          >
            Save Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeePaymentForm;
