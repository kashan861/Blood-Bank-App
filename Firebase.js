// import * as firebase from 'firebase'
import firebase from 'firebase'
import syncStorage from 'sync-storage';
const firebaseConfig = {
    
    apiKey: "AIzaSyAmtfTiCh8rfC15m19dHAO-JhdczyyCrsw",
    authDomain: "blood-bank-3b42e.firebaseapp.com",
    databaseURL: "https://blood-bank-3b42e.firebaseio.com",
    projectId: "blood-bank-3b42e",
    storageBucket: "blood-bank-3b42e.appspot.com",
    messagingSenderId: "708063973788",
    appId: "1:708063973788:web:caa1964e2b62d418483859",
    measurementId: "G-YQMNK6KLWF"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
// const userData = SyncStorage.get('userInfo');
async function joinRoom(fid){
firebase.firestore().collection("chatRoom").doc(fid).set({
  user1: syncStorage.get("userInfo").id,
  user2: fid,
  timestamp: Date.now()
})
}
// firebase.analytics();
export {
  joinRoom
}