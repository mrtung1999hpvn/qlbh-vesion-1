import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCnERgQLDA7CQaIy4aj3Mx3qf-GXbP1kVM",
  authDomain: "qlbh-af21c.firebaseapp.com",
  databaseURL: "https://qlbh-af21c.firebaseio.com",
  projectId: "qlbh-af21c",
  storageBucket: "qlbh-af21c.appspot.com",
  messagingSenderId: "36141210566",
  appId: "1:36141210566:web:63baa65fabf46798e170c7",
  measurementId: "G-1ZS2G75TL5"
};
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage , firebase as default}
