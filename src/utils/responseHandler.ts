function errorMessage(err: any, httpStatusCode: number) {
  return {
    code: httpStatusCode,
    error: {
      message: err.errors ? err.errors.at(0).message : err.message,
    },
  };
}

function sucessful(
  payload: string | object | undefined,
  httpStatusCode: number
) {
  return {
    code: httpStatusCode,
    payload,
  };
}

export default { errorMessage, sucessful };
