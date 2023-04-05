import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { db } from '../config/firebase'
// import { FirestoreDataConverter } from 'firebase-admin/firestore'

import { Entry } from '../models/Entry'

import { entryConverter } from '../infrastructures/firebase/converters/entryConverter'

import { createEntry, getEntries } from '../repositories/Entry/entryRepository'
import { Result } from '../models/Result'

import { SuccessResponse, newSuccessResponse } from '../models/SuccessResponse'

type ErrorResponse = {
  message: string
}

type EntryType = {
  id: string
  title: string
  text: string
}

type RequestBody = {
  body: EntryType
  param: { entryId: string }
}

const addEntry = async (req: ExpressRequest<{}, {}, { title: string; text: string; }>, res: ExpressResponse<SuccessResponse<EntryType> | ErrorResponse>) => {
  const { title, text } = req.body

  const createEntryResult = await createEntry({ title, text })

  createEntryResult.isSuccess
    ? res.set(200).send(newSuccessResponse(createEntryResult.value))
    : res.status(500).json({
      message: 'Failed to save new entry.',
    })
}

const getAllEntries = async (req: ExpressRequest, res: ExpressResponse<SuccessResponse<EntryType[]> | ErrorResponse>) => {
  const getAllEntriesResult = await getEntries()

  getAllEntriesResult.isSuccess
  ? res.set(200).send(newSuccessResponse(getAllEntriesResult.value))
  : res.status(500).json({ message: 'Failed to get all entries.' })
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
