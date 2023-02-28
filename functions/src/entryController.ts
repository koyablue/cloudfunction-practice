import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { db } from './config/firebase'

type EntryType = {
  title: string
  text: string
}

type RequestBody = {
  body: EntryType
  param: { entryId: string }
}

const addEntry = async (req: ExpressRequest<RequestBody>, res: ExpressResponse) => {
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
    if (error instanceof Error) {
      res.status(500).json(error.message)
      return
    }

    res.status(500).json(error)
  }
}

const getAllEntries = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const allEntries = await db.collection('entries').get()
    return res.status(200).json(allEntries.docs)
  } catch(error) {
    return res.status(500).json('error')
  }
}

export { addEntry, getAllEntries }
