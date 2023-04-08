import { Entry } from '../../models/Entry'

// DTO
export type CreateEntryRequest = {
  title: string
  text: string
}

// DTO
export type CreateEntitySuccessResponse = {
  data: Entry
}

// DTO
export type UpdateEntryUseCaseRequest = {
  id: string
  title: string
  text: string
}

// DTO
export type UpdateEntryRepositoryRequest = {
  entry: Entry
}
