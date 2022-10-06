import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";

const Reasons = () => {
  const db = getFirestore();

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "cities", "SF");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getData();
  });

  return <div className="content-area"></div>;
};

export default Reasons;
