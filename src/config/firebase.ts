import admin from 'firebase-admin'
import env from '@env'

admin.initializeApp({
  credential: admin.credential.cert(env.firebaseServiceAccount)
})

const db = admin.firestore()
const auth = admin.auth()
const storage = admin.storage()
const messaging = admin.messaging()

export { admin, db, auth, storage, messaging }
