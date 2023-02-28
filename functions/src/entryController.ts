import { Request, Response } from 'express'
import { db } from './config/firebase'

type EntryType = {
  title: string
  text: string
}

type RequestBody = {
  body: EntryType
  param: { entryId: string }
}

const addEntry = async (req: Request<RequestBody>, res: Response) => {
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

export { addEntry }
