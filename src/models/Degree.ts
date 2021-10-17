import LocalizedString from './LocalizedString'

class Degree {
  id: string
  name: LocalizedString
  regulations: number

  constructor(id: string, name: LocalizedString, regulations: number) {
    this.id = id
    this.name = name
    this.regulations = regulations
  }
}

export default Degree
