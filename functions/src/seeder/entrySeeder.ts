import { faker } from '@faker-js/faker'
import * as fireStoreService from 'firestore-export-import';

import { Entry } from '../models/Entry'

import { db } from '../config/firebase'

type EntryData = Omit<Entry, 'id'>

type EntrySeed = {
  entry: EntryData[]
}

const entryFactory = (number: number): EntryData[] => {
  if (number <= 0) return []

  const entries: EntryData[] = []

  for (let i = 0; i < number; i++) {
    entries.push({
      title: faker.lorem.text(),
      text: faker.lorem.text(),
    })
  }

  return entries
}

const entries: EntrySeed = {
  entry: entryFactory(10),
}

const entrySeeder = () => {}

const jsonToFirestore = async (): Promise<void> => {
  try {
      await fireStoreService.restore('./users.json');
  } catch (e) {
      console.log(e);
  }
}

jsonToFirestore();
