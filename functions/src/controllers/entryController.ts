import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { db } from '../config/firebase'
// import { FirestoreDataConverter } from 'firebase-admin/firestore'

import { SuccessResponse, newSuccessResponse } from '../models/SuccessResponse'

import { getAllEntriesUseCase } from '../useCases/Entry/getAllEntriesUseCase'
import { createEntryUseCase } from '../useCases/Entry/createEntryUseCase'
import { updateEntryUseCase } from '../useCases/Entry/updateEntryUseCase'

type ErrorResponse = {
  message: string
}

type EntryType = {
  id: string
  title: string
  text: string
}

const create = async (req: ExpressRequest<{}, {}, { title: string; text: string; }>, res: ExpressResponse<SuccessResponse<EntryType> | ErrorResponse>) => {
  const createEntryRequest = req.body
  const createEntryResult = await createEntryUseCase(createEntryRequest)

  return createEntryResult.isSuccess
    ? res.set(200).send(newSuccessResponse(createEntryResult.value))
    : res.status(500).json({
      message: 'Failed to save new entry.',
    })
}

const index = async (req: ExpressRequest, res: ExpressResponse<SuccessResponse<EntryType[]> | ErrorResponse>) => {
  const getAllEntriesResult = await getAllEntriesUseCase()

  return getAllEntriesResult.isSuccess
  ? res.set(200).send(newSuccessResponse(getAllEntriesResult.value))
  : res.status(500).json({ message: 'Failed to get all entries.' })
}

const update = async (req: ExpressRequest<{ entryId: string }, {}, EntryType>, res: ExpressResponse) => {
  const { body, params } = req

  const updateResult = await updateEntryUseCase(
    {id: params.entryId, title: body.title, text: body.text })

    return updateResult.isSuccess
      ? res.status(200).json(newSuccessResponse(updateResult.value))
      : res.status(500).json({ message: 'Failed to update the entry.' })
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

export { create, index, update, deleteEntry }
