import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyB4ZNK1sRLKejWRl_MCEg2k8GxwAO37K-4",
  authDomain: "ninja-9cf87.firebaseapp.com",
  projectId: "ninja-9cf87",
  storageBucket: "ninja-9cf87.appspot.com",
  messagingSenderId: "712981274533",
  appId: "1:712981274533:web:debca2fbf8cb696535924c",
  measurementId: "G-TYXHX57LEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "recipe");

const list = document.querySelector("ul");
const form = document.querySelector("form");

const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();
  let html = `
    <li data-id="${id}">
    <div>${recipe.title}</div>
    <div>${time}</div>
    <button >delete</button>
    </li>`;
  list.innerHTML += html;
};

onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach((snapshot) => {});
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
  });
});

getDocs(collection(db, "recipe"))
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
      addRecipe(doc.data(), doc.id);
    });
  })
  .catch((err) => console.log(err));

// async function getRecipes(db) {
//   const recipeCol = collection(db, "recipe");
//   const recipeSnapshot = await getDocs(recipeCol);
//   const recipeList = recipeSnapshot.docs.map((doc) => {
//     addRecipe(doc.data());
//     console.log(doc.data());
//   });
//   return recipeList;
// }
// getRecipes(db);

//since it's a async func , it returns a promise

//adding data
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const now = new Date();
  const recipe = {
    title: form.add_new_recipe.value,
    created_at: Timestamp.fromDate(now),
  };
  addDoc(colRef, recipe)
    .then(() => {
      console.log("recipe added !");
      form.reset();
    })
    .catch((err) => console.log(err));
});

//deleting data
//we're not going to add an event listener to every button,
//instead we're going to use event delegation,
//meaning that were attaching it to the whole ul
//then we check if what we clicked is a button or not
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.parentElement.getAttribute("data-id");
    // the doc function is similar to collection() because it gets us the reference to the document that we want
    const docRef = doc(db, "recipe", id);
    deleteDoc(docRef)
      .then(() => console.log("recipe deleted!"))
      .catch((err) => console.log(err));
  }
});
