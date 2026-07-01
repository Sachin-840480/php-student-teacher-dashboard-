import { useEffect, useState } from "react";
import { getFeeStatus, addFeePayment } from "../services/api";
import styles from "../modules/FeeStatus.module.css";

function FeeStatus() {

    const initialState = {
        student_id: "",
        total_fee: "",
        paid_fee: "",
        payment_date: "",
        remarks: ""
    };

    const [fees, setFees] = useState([]);
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        loadFees();
    }, []);

    const loadFees = async () => {
        try {
            const res = await getFeeStatus();
            setFees(res.data);
        } catch (err) {
            console.error(err);
            alert("Unable to load fee status");
        }
    };

    const handleStudent = (student) => {

        const today = new Date().toISOString().split("T")[0];

        setForm({
            student_id: student.student_id,
            total_fee: student.total_fee,
            paid_fee: "",
            payment_date: today,
            remarks: ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addFeePayment(form);

            alert("Payment Added Successfully");

            setForm(initialState);

            loadFees();

        } catch (err) {

            console.error(err);

            alert("Payment Failed");

        }

    };

    return (

        <div className={styles.container}>

            <h1>Fee Management</h1>

            {form.student_id !== "" && (

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    <h2>Add Fee Payment</h2>

                    <div className={styles.grid}>

                        <div>

                            <label>Paid Fee</label>

                            <input
                                type="number"
                                name="paid_fee"
                                value={form.paid_fee}
                                onChange={handleChange}
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
                                rows="3"
                                name="remarks"
                                value={form.remarks}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <button type="submit">
                        Save Payment
                    </button>

                </form>

            )}

            <div className={styles.tableContainer}>

                <h2>Fee Status</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Student</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Pending</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {fees.length === 0 ? (

                            <tr>

                                <td colSpan="6">
                                    No Records Found
                                </td>

                            </tr>

                        ) : (

                            fees.map((student) => (

                                <tr key={student.student_id}>

                                    <td>
                                        {student.student_name}
                                    </td>

                                    <td>
                                        ₹ {student.total_fee}
                                    </td>

                                    <td>
                                        ₹ {student.paid_fee}
                                    </td>

                                    <td>
                                        ₹ {student.pending_fee}
                                    </td>

                                    <td>

                                        {Number(student.pending_fee) <= 0
                                            ? "Paid"
                                            : "Pending"}

                                    </td>

                                    <td>

                                        <button
                                            className={styles.payBtn}
                                            onClick={() =>
                                                handleStudent(student)
                                            }
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

        </div>

    );

}

export default FeeStatus;