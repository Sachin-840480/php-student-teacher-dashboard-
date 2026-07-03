import { useState } from "react";
import Layout from "../../../components/common/Layout";
import FeePaymentForm from "../components/FeePaymentForm";
import FeeTable from "../components/FeeTable";

import styles from "../styles/FeeStatus.module.css";

import feeInitialState from "../constants/feeInitialState";

import useFees from "../hooks/useFees";
import { selectStudent } from "../utils/feeHelpers";
import { addFeePayment } from "../../../services/api";

import toast from "react-hot-toast";

function FeeStatus() {
  const { fees, loading, loadFees } = useFees();

  const [form, setForm] = useState(feeInitialState);

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.student_id) {
      toast.error("Please select a student.");
      return;
    }

    if (!form.paid_fee || Number(form.paid_fee) <= 0) {
      toast.error("Enter a valid payment amount.");
      return;
    }

    try {
      await addFeePayment(form);

      toast.success("Payment Added Successfully");

      setForm(feeInitialState);

      loadFees();
    } catch (err) {
      console.error(err);
      toast.error("Payment Failed");
    }
  };

  const handleStudent = (student) => {
    selectStudent(student, setForm);
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Loading...</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Fee Management</h1>

        {form.student_id ? (
          <FeePaymentForm
            form={form}
            fees={fees}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <div className={styles.infoCard}>
            <h3>Select a Student</h3>
            <p>
              Click the <strong>Pay</strong> button below to add a fee payment.
            </p>
          </div>
        )}

        {/* <FeeTable
            fees={fees}
            handleStudent={(student) => selectStudent(student, setForm)}
          /> */}
        <FeeTable fees={fees} handleStudent={handleStudent} />
      </div>
    </Layout>
  );
}

export default FeeStatus;
