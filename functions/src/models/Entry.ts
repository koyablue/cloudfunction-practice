export class Entry {
  private id: string
  private title: string
  private text: string

  constructor(title: string, text: string, id?: string) {
    this.id = id || ''
    this.title = title
    this.text = text
  }

  getId() {
    return this.id
  }

  getTitle() {
    return this.title
  }

  getText() {
    return this.text
  }
}
