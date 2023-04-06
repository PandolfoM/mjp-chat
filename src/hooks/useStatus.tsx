import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../auth/context";

export default function useStatus() {
  const { currentUser } = useContext(AuthContext);
  const updateStatus = async (idle: string) => {
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser?.uid), {
        status: idle,
      });
    }
  };

  return {
    updateStatus,
  };
}
