import * as admin from 'firebase-admin'
import * as dotenv from 'dotenv'

// import { config } from './firebaseConfigJson'

dotenv.config()

// tried to use env values but didn't work well somehow
// it seemed that env values are empty while deploying
admin.initializeApp({
  credential: admin.credential.cert({
    // projectId: config.project_id,
    // clientEmail: config.client_email,
    // privateKey: config.private_key.replace(/\\n/gm, "\n"),
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    // NOTE: Do not include single quote like: PRIVATE_KEY="'--BEGIN...'"
    // Always remove the first and the last single quote like this: "--BEGIN...END\n--"
    privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY
      ? process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/gm, "\n")
      : undefined,
  }),
  // https://<app-name>.firebaseio.com
  databaseURL: 'https://rest-api-journal.firebaseio.com',
})

const db = admin.firestore()

export { admin, db }
