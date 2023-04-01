import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { db } from './config/firebase'
// import { FirestoreDataConverter } from 'firebase-admin/firestore'

type SuccessResponse<T> = {
  status: 'success',
  message: 'entry added successfully',
  data?: T
}

type ErrorResponse = {
  message: string
}

type EntryType = {
  title: string
  text: string
}

type RequestBody = {
  body: EntryType
  param: { entryId: string }
}

const entryRef = db.collection('entries').withConverter<EntryType>({
  toFirestore(entry: EntryType): FirebaseFirestore.DocumentData {
    return entry;
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): EntryType {
    const data = snapshot.data();
    return {
      title: data.title,
      text: data.text
    };
  }
});

const addEntry = async (req: ExpressRequest<RequestBody>, res: ExpressResponse<SuccessResponse<EntryType> | ErrorResponse>) => {
  const { title, text } = req.body

  try {
    const entry = entryRef.doc()
    const entryObject = {
      id: entry.id,
      title,
      text
    }

    entry.set(entryObject)

    res.set(200).send({
      status: 'success',
      message: 'entry added successfully',
      data: entryObject
    })
  } catch(error) {
    res.status(500).json({ message: 'error' })
  }
}

const getAllEntries = async (req: ExpressRequest, res: ExpressResponse) => {
  try {

    // const allEntries = await db.collection('entries').get()
    const allEntries: EntryType[] =[]

    // const querySnapshot = await (await db.collection('entries').withConverter(entryConverter).get()).docs

    const querySnapshot = await db.collection('entries').get()

    querySnapshot.forEach(doc => allEntries.push(doc.data() as EntryType))

    return res.status(200).json(allEntries)
  } catch(error) {
    return res.status(500).json('error')
  }
}

const updateEntry = async (req: ExpressRequest<{ entryId: string }, {}, EntryType>, res: ExpressResponse) => {
  const { body, params } = req

  try {
    const entry = db.collection('entries').doc(params.entryId)
    const currentData = (await entry.get()).data() as EntryType || {}

    const entryObject = {
      title: body.title || currentData.title,
      text: body.text || currentData.text,
    }

    await entry.set(entryObject)

    return res.status(200).json({
      status: 'success',
      message: 'entry updated successfully',
      data: entryObject
    })

  } catch(error) {
    return res.status(500).json('error')
  }
}

const deleteEntry = async (req: ExpressRequest<{ entryId: string }>, res: ExpressResponse) => {
  const { entryId } = req.params

  try {
    const entry = db.collection('entries').doc(entryId)

    await entry.delete()

    return res.status(200).json({
      status: 'success',
      message: 'entry deleted successfully'
    })
  } catch(error) {
    return res.status(500).json('error')
  }
}

export { addEntry, getAllEntries, updateEntry, deleteEntry }
