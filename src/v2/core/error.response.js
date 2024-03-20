const statusCode = require('./status.code')
const reasonError = require('./error.reason')
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class AuthError extends ErrorResponse {
    constructor(message = reasonError.UNAUTHORIZED, status = statusCode.UNAUTHORIZED) {
        super(message, status)
    }
}

module.exports = {
    AuthError
}