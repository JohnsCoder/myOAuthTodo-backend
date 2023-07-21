type Err = {
  message: string;
  errors?: {
    message: string;
  }[];
};

function errorMessage(err: Err, httpStatusCode: number) {
  let message;
  if (err.errors) {
    message = err.errors.at(0)!.message;
  } else {
    message = err.message;
  }

  return {
    code: httpStatusCode,
    error: {
      message,
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
