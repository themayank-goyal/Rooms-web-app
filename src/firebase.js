import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  getDocs,
  collection,
  onSnapshot,
  setDoc,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';

import { serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB06zhO2v-bbc8NzA-R_ZzAgHauCCd9PmY',
  authDomain: 'rooms-bfcc3.firebaseapp.com',
  projectId: 'rooms-bfcc3',
  storageBucket: 'rooms-bfcc3.appspot.com',
  messagingSenderId: '862649830684',
  appId: '1:862649830684:web:e42db5320fff793b4b3ed9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const colRef = collection(db, 'users');

export const getMessages = async (setMessages, roomcode) => {
  const unsub = onSnapshot(doc(db, 'rooms', roomcode), (doc) => {
    setMessages(doc.data().input);
  });
};

export const addMessages = async (roomcode, message, username) => {
  try {
    const docRef = doc(db, 'rooms', roomcode);
    const res = await updateDoc(docRef, {
      input: arrayUnion({
        username: username,
        text: message,
        time: Timestamp.now().seconds,
      }),
    });
    return true;
  } catch (error) {
    console.log('ADD MESSAGE ERROR !!: ' + error);
    return false;
  }
};

export const handleAuth = async (setUser, username) => {
  if (!username) {
    try {
      const results = await signInWithPopup(auth, provider);
      console.log(results.user);
      setUser(results?.user);
      const USERNAME = results?.user.email.split('@')[0];
      const userRef = doc(db, 'users', USERNAME);
      const userInfo = await getDoc(userRef);
      if (!userInfo._document) {
        await setDoc(userRef, {
          username: USERNAME,
          rooms: [],
        });
      }
    } catch (error) {
      alert('error: ' + error);
    }
  } else {
    try {
      await signOut(auth);
      setUser();
    } catch (error) {
      console.log('ERROR:' + error);
    }
  }
};

export const myOnAuthStateChanged = (setUser, navigate) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      navigate('/rooms');
    } else {
      setUser();
      navigate('/login');
    }
  });
};

export const createRoom = async (roomInfo) => {
  const roomRef = doc(db, 'rooms', roomInfo.roomcode);
  const roomDoc = await getDoc(roomRef);
  if (!roomDoc._document) {
    try {
      await setDoc(roomRef, {
        name: roomInfo.name,
        roomcode: roomInfo.roomcode,
        members: [],
        input: [],
      });
      return true;
    } catch (error) {
      console.log('ERROR WHILE CREATING ROOM: ' + error);
      return false;
    }
  } else {
    alert('roomcode must be unique');
  }
};

export const getAllRooms = async (setAllRooms) => {
  const colRef = collection(db, 'rooms');
  try {
    const snapshot = await getDocs(colRef);
    let data = [];
    snapshot.docs.map((doc) => {
      data = [...data, { ...doc.data() }];
    });
    setAllRooms(data);
  } catch (error) {
    alert('ERROR:' + error);
  }
};

export const getUserJoinedRooms = async(username, setJoinedRooms) => {
  const docRef = doc(db, 'users', username);

  onSnapshot(docRef, (doc) => {
    setJoinedRooms(doc.data().rooms)
  });
}

export const joinRoom = async (username, roomcode) => {
  try {
    const userDocRef = doc(db, 'users', username);
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomcode),
    });
    const roomDocRef = doc(db, 'rooms', roomcode);
    await updateDoc(roomDocRef, {
      members: arrayUnion(username),
    });
  } catch (error) {
    console.log('JOIN ERROR___'+ error);
  }
};
