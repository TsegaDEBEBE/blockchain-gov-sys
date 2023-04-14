import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD4q_QFxOWugBg-VNRY9ODRxZHD3Gv-yk",
  authDomain: "blockchain-gov-sys.firebaseapp.com",
  projectId: "blockchain-gov-sys",
  storageBucket: "blockchain-gov-sys.appspot.com",
  messagingSenderId: "1046338931402",
  appId: "1:1046338931402:web:b04325f7161e1184994233",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { firebaseApp, db };