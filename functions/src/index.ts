import * as functions from 'firebase-functions'
import * as express from 'express'

// https://www.youtube.com/watch?v=T8SZv6h2WbY

// initialize express
const app = express()

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })

// exports.app = functions.https.onRequest(app)

app.get('/', (req, res) => res.status(200).send('Hey there!'))

const api = functions.https.onRequest(app)
module.exports = {api}
