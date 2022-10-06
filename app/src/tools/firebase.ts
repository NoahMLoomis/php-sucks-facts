import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onChildAdded } from "firebase/database";

const app = initializeApp({
  databaseURL: "https://fir-test-a2f7f-default-rtdb.firebaseio.com/",
  projectId: "fir-test-a2f7f",
});
const db = getDatabase(app);

const reasonExists = async (reason: string) => {
  const dbRef = ref(db, "reasons");
  let reasons: string[] = [];
  onChildAdded(dbRef, (snap) => {
    reasons.push(snap.val().fact);
  });
  return reasons.includes(reason);
};

const writetoDB = async (reason: string) => {
  const postListRef = ref(db, "reasons");
  const newPostRef = push(postListRef);
  set(newPostRef, {
    fact: reason,
  })
    .then(() => true)
    .catch((e) => false);
};

export { writetoDB, reasonExists };
