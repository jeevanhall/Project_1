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

    