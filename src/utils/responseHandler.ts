type Err = {
  message: string;
  errors?: {
    message: string;
  }[];
};

function errorMessage(err: Err, httpStatusCode: number) {
  return {
    code: httpStatusCode,
    error: {
      message: err.errors?.at(0)?.message || err.message,
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
