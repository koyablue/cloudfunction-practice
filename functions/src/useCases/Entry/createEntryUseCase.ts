import { CreateEntryRequest } from '../../repositories/Entry/types'
import { createEntry } from '../../repositories/Entry/entryRepository'

export const createEntryUseCase = async (createEntryRequest: CreateEntryRequest) => {
  const createEntryResult = await createEntry(createEntryRequest)
  return createEntryResult
}
