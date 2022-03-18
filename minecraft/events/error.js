module.exports = {
  name: "error",
  async execute(error) {
    log(error, 'ERROR')
  }
}