import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA1Zj-8Soeyl4MzEufZ12cFoAf7CWdOMkU',
  authDomain: 'netfix-clone-9fa9a.firebaseapp.com',
  projectId: 'netfix-clone-9fa9a',
  storageBucket: 'netfix-clone-9fa9a.appspot.com',
  messagingSenderId: '752151233610',
  appId: '1:752151233610:web:62d1468ddbb9a8779f12b3',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default db

export { auth, app }
