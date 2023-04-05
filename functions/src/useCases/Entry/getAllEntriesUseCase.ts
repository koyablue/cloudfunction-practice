import { getEntries } from '../../repositories/Entry/entryRepository'

export const getAllEntriesUseCase = async () => {
  const result = await getEntries()
  return result
}
