import { getApps, getApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBX2PBgqLolDrs3PsOCevO2tl-R-zScLuc",
  authDomain: "appfinalterm-7e93e.firebaseapp.com",
  projectId: "appfinalterm-7e93e",
  storageBucket: "appfinalterm-7e93e.appspot.com",
  messagingSenderId: "309514409677",
  appId: "1:309514409677:web:ce56852b44331e87967b84"
};

const app_length = getApps().length > 0;

// Initialize Firebase
const app = app_length ? getApp() : initializeApp(firebaseConfig);

//REFERENCE AUTH
export const auth = app_length ? getAuth(app) :
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

// REFERENCE DB
const db = getFirestore(app);

export const login = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export const register = async ({ name, email, password }) => {
  const userCredential =
    await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    name,
    schoolname:"學校尚未填寫",
    email: "",
    adrs: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkamA8OGUcB1Lbo3S28cjZkaecyTFI6R6ww&usqp=CAU",
    tel: ""
  });
  return userCredential.user;
}

export const logout = () => {
  signOut(auth);
}

export const readUser = async () => {
  const { uid } = auth.currentUser;

  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return "No such document!";
    }
  } catch (e) {
    console.log(e)
  }

}
export const addmsg = async ({ msg}) => {
  await setDoc(doc(db, "msgs",), {
    senderName:"aaa",
    timeStamp: "111",
    message: "FUCK YOU",
    photourl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkamA8OGUcB1Lbo3S28cjZkaecyTFI6R6ww&usqp=CAU",

  });
  return userCredential.user;
}

export const updateUser = async (userInfo) => {
  const { uid } = auth.currentUser;
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, userInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e)
  }
}