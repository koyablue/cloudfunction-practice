import * as admin from 'firebase-admin'

import { config } from './firebaseConfigJson'

// tried to use env values but didn't work well somehow
// it seemed that env values are empty while deploying
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.project_id,
    clientEmail: config.client_email,
    privateKey: config.private_key.replace(/\\n/gm, "\n"),
  }),
  // https://<app-name>.firebaseio.com
  databaseURL: 'https://rest-api-journal.firebaseio.com',
})

const db = admin.firestore()

export { admin, db }
