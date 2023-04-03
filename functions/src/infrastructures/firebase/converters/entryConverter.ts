import { Entry } from '../../../models/Entry'

const entryToFirestore = (entry: Entry): FirebaseFirestore.DocumentData => {
  return {
    id: entry.id,
    title: entry.title,
    text: entry.text,
  };
}

const entryFromFirestore = (
  snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
): Entry => {
  const data = snapshot.data();
  return { id: data.id, title: data.title, text: data.text }
}

export const entryConverter = {
  toFirestore: entryToFirestore,
  fromFirestore: entryFromFirestore,
}