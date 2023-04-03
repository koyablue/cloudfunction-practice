import { Entry } from '../../models/Entry'

export type CreateEntryRequest = {
  title: string
  text: string
}

export type CreateEntitySuccessResponse = {
  data: Entry
}
