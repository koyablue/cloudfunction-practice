import { getEntryById, updateEntry } from '../../repositories/Entry/entryRepository'
import { UpdateEntryUseCaseRequest } from '../../repositories/Entry/types'

import { newFailure } from '../../models/Result'
import { Entry } from '../../models/Entry'

export const updateEntryUseCase = async ({ id, title, text }: UpdateEntryUseCaseRequest) => {
  const getEntryResult = await getEntryById(id)
  // TODO: true or false
  if (getEntryResult.isFailure) {
    // FIXME: consider error response structure
    return newFailure(getEntryResult.value)
  }

  const entryToUpdate = getEntryResult.value
  const entry: Entry = {
    id: entryToUpdate.id,
    title: title || entryToUpdate.title,
    text: text || entryToUpdate.text,
  }

  const result = await updateEntry({ entry })
  return result
}
