class NoValideDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = NoValideDataError;
