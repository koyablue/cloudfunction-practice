import { CreateEntitySuccessResponse, CreateEntryRequest } from './types'
import { Result, newFailure, newSuccess } from '../../models/Result'
import { ErrorResponse } from '../../models/ErrorResponse'
import { db } from '../../config/firebase'
import { Entry } from '../../models/Entry'
import { entryConverter } from '../../infrastructures/firebase/converters/entryConverter'

const entryRef = db.collection('entity').withConverter<Entry>(entryConverter)

const createEntry = async ({ title, text }: CreateEntryRequest): Promise<Result<Entry, unknown>>  => {
  try {
    const entry = entryRef.doc()

    const entryObject = {
      id: entry.id,
      title,
      text
    }

    await entry.set(entryObject)

    return newSuccess(entryObject)
  } catch(error) {
    return newFailure(error)
  }
}

const getEntries = async (): Promise<Result<Entry[], unknown>> => {
  try {
    const querySnapshot = await entryRef.get()
    const allEntries = querySnapshot.docs.map(doc => doc.data())

    return newSuccess(allEntries)
  } catch(error) {
    return newFailure(error)
  }
}

export {
  createEntry,
  getEntries,
}
