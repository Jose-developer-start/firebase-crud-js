
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
  import { getFirestore,collection,addDoc,getDocs, onSnapshot,deleteDoc,doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDga51RLvQ3ljSaIstrSWCNvbyHq4xyYVk",
    authDomain: "task-app-ae148.firebaseapp.com",
    projectId: "task-app-ae148",
    storageBucket: "task-app-ae148.appspot.com",
    messagingSenderId: "338025924012",
    appId: "1:338025924012:web:0505cdc9fecb77891be609"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore();

  export const saveTask = (title,description) =>{
    addDoc(collection(db,'tasks',),{title: title,description: description})
  }

  export const getTasks = () => getDocs(collection(db, "tasks"));

  export const onGetTasks = (callback)=> onSnapshot((collection(db,'tasks')),callback)

  export const deleteTask = (id)=> deleteDoc(doc(db,'tasks',id));

  export const getTask = (id)=> getDoc(doc(db,'tasks',id))

  export const updateTask = (id,newField) => updateDoc(doc(db,'tasks',id),newField)