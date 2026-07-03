export const selectStudent = (student, setForm) => {
  const today = new Date().toISOString().split("T")[0];

  setForm({
    student_id: student.student_id,
    total_fee: student.total_fee,
    paid_fee: "",
    payment_date: today,
    remarks: "",
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const formatCurrency = (amount) => {
  return `₹ ${Number(amount).toLocaleString("en-IN")}`;
};

export const getStatus = (pendingFee) => {
  return Number(pendingFee) <= 0 ? "Paid" : "Pending";
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};
