import admin from 'firebase-admin'
import env from '@env'

admin.initializeApp({
  credential: admin.credential.cert(env.firebaseServiceAccount)
})

exports.admin = admin
exports.db = admin.firestore()
exports.auth = admin.auth()
exports.storage = admin.storage()
exports.messaging = admin.messaging()
