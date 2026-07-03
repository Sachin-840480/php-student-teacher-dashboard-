import { useEffect, useState } from "react";
import { getFeeStatus } from "../../../services/api";
import toast from "react-hot-toast";

function useFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFees = async () => {
    try {
      const res = await getFeeStatus();
      setFees(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load fee status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  return {
    fees,
    loading,
    loadFees,
  };
}

export default useFees;
