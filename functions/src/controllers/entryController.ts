import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

import { db } from '../config/firebase'

import { Entry } from '../models/Entry'
import { SuccessResponse, newSuccessResponse } from '../models/SuccessResponse'

import { getAllEntriesUseCase } from '../useCases/Entry/getAllEntriesUseCase'
import { createEntryUseCase } from '../useCases/Entry/createEntryUseCase'
import { updateEntryUseCase } from '../useCases/Entry/updateEntryUseCase'
import { deleteEntryUseCase } from '../useCases/Entry/deleteEntryUseCase'

type ErrorResponse = {
  message: string
}

/**
 * All entries
 *
 * @param {ExpressRequest} req
 * @param {(ExpressResponse<SuccessResponse<Entry[]> | ErrorResponse>)} res
 * @return {*}
 */
const index = async (req: ExpressRequest, res: ExpressResponse<SuccessResponse<Entry[]> | ErrorResponse>) => {
  const getAllEntriesResult = await getAllEntriesUseCase()

  return getAllEntriesResult.isSuccess
  ? res.set(200).send(newSuccessResponse(getAllEntriesResult.value))
  : res.status(500).json({ message: 'Failed to get all entries.' })
}

/**
 * Create new entry
 *
 * @param {ExpressRequest<{}, {}, { title: string; text: string; }>} req
 * @param {(ExpressResponse<SuccessResponse<Entry> | ErrorResponse>)} res
 * @return {*}
 */
const create = async (req: ExpressRequest<{}, {}, { title: string; text: string; }>, res: ExpressResponse<SuccessResponse<Entry> | ErrorResponse>) => {
  const createEntryRequest = req.body
  const createEntryResult = await createEntryUseCase(createEntryRequest)

  return createEntryResult.isSuccess
    ? res.set(201).send(newSuccessResponse(createEntryResult.value))
    : res.status(500).json({
      message: 'Failed to save new entry.',
    })
}

/**
 * Update entry
 *
 * @param {ExpressRequest<{ entryId: string }, {}, Entry>} req
 * @param {ExpressResponse} res
 * @return {*}
 */
const update = async (req: ExpressRequest<{ entryId: string }, {}, Entry>, res: ExpressResponse) => {
  const { body, params } = req

  const updateResult = await updateEntryUseCase(
    {id: params.entryId, title: body.title, text: body.text })

    return updateResult.isSuccess
      ? res.status(200).json(newSuccessResponse(updateResult.value))
      : res.status(500).json({ message: 'Failed to update the entry.' })
}

/**
 * Delete entry
 *
 * @param {ExpressRequest<{ entryId: string }>} req
 * @param {ExpressResponse} res
 * @return {*}
 */
const deleteEntry = async (req: ExpressRequest<{ entryId: string }>, res: ExpressResponse) => {
  const { entryId } = req.params
  const deleteEntryResult = await deleteEntryUseCase(entryId)

  return deleteEntryResult.isSuccess
    ? res.status(204).json(newSuccessResponse(deleteEntryResult.value))
    : res.status(500).json({ message: 'Failed to delete the entry.' })

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
