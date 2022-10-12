import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzFoy3xzx6-kT7svyy86Cc1UeTYpywE94",
  authDomain: "fir-test-a2f7f.firebaseapp.com",
  databaseURL: "https://fir-test-a2f7f-default-rtdb.firebaseio.com",
  projectId: "fir-test-a2f7f",
  storageBucket: "fir-test-a2f7f.appspot.com",
  messagingSenderId: "278531058863",
  appId: "1:278531058863:web:8f0cab62243115b6c9b85a",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const getReasons = async () => {
  let reasons: IReasons = [];
  const querySnap = await getDocs(collection(db, "reasons"));
  querySnap.forEach((doc) =>
    reasons.push({
      fact: doc.data().fact,
      id: doc.id,
    })
  );
  return reasons;
};

const addReason = async (reason: string) => {
  try {
    let exists = false;
    const querySnap = await getDocs(collection(db, "reasons"));
    querySnap.forEach((doc) => {
      if (
        doc.data()?.fact?.toLowerCase().trim() === reason.toLowerCase().trim()
      ) {
        exists = true;
      }
    });
    console.log(exists);
    if (exists) {
      return false;
    }
    await addDoc(collection(db, "reasons"), {
      fact: reason,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export { addReason, getReasons };
