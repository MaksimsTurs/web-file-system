const ERROR = {
  RESPONSE_500: (message?: string) => ({ code: 500, message: message || 'Unhandle server error!' })
}

export default ERROR