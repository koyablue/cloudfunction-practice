import * as functions from 'firebase-functions'
import * as express from 'express'
import { create, deleteEntry, index, update } from './controllers/entryController'

// https://www.youtube.com/watch?v=T8SZv6h2WbY

// initialize express
const app = express()

// NOTE: Start writing functions
// https://firebase.google.com/docs/functions/typescript

// response check
// app.get('/', (req, res) => res.status(200).send('Hey there!'))

app.post('/entries', create)
app.get('/entries', index)
app.patch('/entries/:entryId', update)
app.delete('/entries/:entryId', deleteEntry)

const api = functions.https.onRequest(app)
module.exports = {api}
