import { deleteEntry, getEntryDocRefById } from '../../repositories/Entry/entryRepository'

export const deleteEntryUseCase = async (id: string) => {
  const entryDocRefResult = await getEntryDocRefById(id)
  if (entryDocRefResult.isFailure) return entryDocRefResult

  return await deleteEntry(entryDocRefResult.value)
}
