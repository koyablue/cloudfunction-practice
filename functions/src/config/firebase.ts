import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
  }),
  // https://<app-name>.firebaseio.com
  databaseURL: 'https://rest-api-journal.firebaseio.com',
})

const db = admin.firestore()

export { admin, db }
