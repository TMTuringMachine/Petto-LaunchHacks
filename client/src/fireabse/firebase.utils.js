import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLi-UWYZK_c0DVSw1NTolal9-Lvrx5xh4",
  authDomain: "petscape-a734c.firebaseapp.com",
  projectId: "petscape-a734c",
  storageBucket: "petscape-a734c.appspot.com",
  messagingSenderId: "387074890222",
  appId: "1:387074890222:web:dab96ffa4f97d7478a56ff",
  measurementId: "G-9YNGFSRKRD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const createMessageBox = async (userId, hostId) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      userId,
      hostId,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const copyArr = (arr1, arr2) => {
  for (let a of arr1) {
    const temp = { ...a };
    arr2.push(temp);
  }
};

export const getMessages = async (id) => {
  // const unsub = onSnapshot(collection(db,`messages/${id}/chat`),(doc)=>{
  //   console.log(doc.data(),"hereeeee");
  // })

  let messages = [];

  const q = query(collection(db, `messages/${id}/chat`));
  const unsub = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    console.log(messages);
  });
  return messages;

  // const charRef = db.doc(`/messages/${id}`).collection('chat');
  // charRef.onSnapshot(snapshot => {
  //   const messages = snapshot.docs.map(doc => doc.data());
  //   console.log(messages);
  // })
};

export const sendMessage = async (id, text) => {
  const docRef = await addDoc(collection(db, `messages/${id}/chat`), {
    text,
  });
  console.log(docRef.id);
};
