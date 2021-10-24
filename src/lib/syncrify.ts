function syncrify(fn: () => Promise<void>): void {
  fn()
}

export default syncrify
