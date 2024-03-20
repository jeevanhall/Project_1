// const form = document.getElementById("form");
// const result = document.getElementById("result");

// form.addEventListener("submit", function (e) {
//   const formData = new FormData(form);
//   e.preventDefault();
//   var object = {};
//   formData.forEach((value, key) => {
//     object[key] = value;
//   });
//   var json = JSON.stringify(object);
//   result.innerHTML = "Please wait...";

//   fetch("https://api.web3forms.com/submit", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: json
//   })
//     .then(async (response) => {
//       let json = await response.json();
//       if (response.status == 200) {
//         result.innerHTML = json.message;
//         result.classList.remove("text-gray-500");
//         result.classList.add("text-green-500");
//       } else {
//         console.log(response);
//         result.innerHTML = json.message;
//         result.classList.remove("text-gray-500");
//         result.classList.add("text-red-500");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       result.innerHTML = "Something went wrong!";
//     })
//     .then(function () {
//       form.reset();
//       setTimeout(() => {
//         result.style.display = "none";
//       }, 5000);
//     });
// });


import { initializeApp } from 'firebase/app';


import {
    getFirestore, collection, getDocs, 
    addDoc, deleteDoc, doc
    
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBMj3DFrLfumEa2J9SdzI3PJa3AYukFg-0",
    authDomain: "coffeewebsite-6a343.firebaseapp.com",
    projectId: "coffeewebsite-6a343",
    storageBucket: "coffeewebsite-6a343.appspot.com",
    messagingSenderId: "171754209270",
    appId: "1:171754209270:web:09bcbda1019abd8e2e91d7"
  };
  

  // init firebase app 
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()

  // collection ref
  const colRef = collection(db, 'ContactDetails')


  // get collection data
  getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs);   
        let contactDetils = []
        snapshot.docs.forEach ((doc) => {
          contactDetils.push({ ...doc.data(), id: doc.id })  
        })
        console.log(contactDetils);
    })
    .catch(err => {
        console.log(err.message);
    })


    // adding documents
    const addCustomer = document.querySelector('.add')
    addCustomer.addEventListener('submit',(e) => {
        e.preventDefault();

        addDoc(colRef, {
            FullName: addCustomer.FullName.value,
            EmailId: addCustomer.EmailId.value,
            PhoneNumber: addCustomer.PhoneNumber.value,
            Message: addCustomer.Message.value
    })
    .then(() => {
        addCustomer.reset()
    })

    })


    //deleting documents

    const deleteCustomer = document.querySelector('.delete')
    deleteCustomer.addEventListener('submit',(e) => {
        e.preventDefault();

        const docRef = doc(db, 'ContactDetails', deleteCustomer.id.value);
        deleteDoc(docRef)
            .then(() => {
                deleteCustomer.reset()
            })



    })

    
