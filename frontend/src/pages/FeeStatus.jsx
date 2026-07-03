import { useState } from "react";
import Layout from "../components/Layout";
import FeePaymentForm from "../components/fee/FeePaymentForm";
import FeeTable from "../components/fee/FeeTable";

import styles from "../modules/FeeStatus.module.css";

import feeInitialState from "../constants/feeInitialState";
import useFees from "../hooks/useFees";
import { selectStudent } from "../utils/feeHelpers";
import { addFeePayment } from "../services/api";

import toast from "react-hot-toast";

function FeeStatus() {
  const { fees, loadFees } = useFees();

  const [form, setForm] = useState(feeInitialState);

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addFeePayment(form);

      toast.success("Payment Added Successfully");

      setForm(feeInitialState);

      loadFees();

    } catch {
      toast.error("Payment Failed");
    }
  };

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

        <FeeTable
          fees={fees}
          handleStudent={(student) =>
            selectStudent(student, setForm)
          }
        />

      </div>
    </Layout>
  );
}

export default FeeStatus;
