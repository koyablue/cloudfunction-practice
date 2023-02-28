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

// const assertEntryType = (data: any): asserts data is EntryType => {
//   const d = data as Partial<EntryType>
//   if (!(typeof d?.text === 'string' && typeof d.title === 'string')) {
//     throw new Error('data is not EntryType type.')
//   }
// }

// const entryConverter: FirestoreDataConverter<EntryType> = {
//   // fromFirestore(ss, op) {
//   //   const data = ss.data(op);
//   //   assertUser(data);
//   //   return data;
//   // },
//   // toFirestore: (model: User) => model,
//   toFirestore(entry: EntryType) {
//     return { title: entry.title, text: entry.text }
//   },
//   fromFirestore(snapshot) {
//     const data = snapshot.data()
//     return data.map((d: any) => ({ title: d.title, text: d.text }))
//   }
// };

const addEntry = async (req: ExpressRequest<RequestBody>, res: ExpressResponse<SuccessResponse<EntryType> | ErrorResponse>) => {
  const { title, text } = req.body

  try {
    const entry = db.collection('entries').doc()
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
