module.exports = {
  name: "kicked",
  async execute(reason) {
    log(reason, 'ERROR')
  }
}