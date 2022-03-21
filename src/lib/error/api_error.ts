export default class ApiError extends Error {
  status_code: number

  constructor(message: string, status_code: number) {
    super(message)
    this.message = message
    this.status_code = status_code
  }

  public toObject() {
    return {
      message: this.message,
      status_code: this.status_code,
    }
  }
}
