function Response(err: any, httpStatusCode: number, data?: any) {
  if (err) {
    return {
      code: httpStatusCode,
      error: {
        message: err.errors ? err.errors[0].message : err.message,
      },
    };
  }

  return {
    code: httpStatusCode,
    data,
  };
}

export default Response;
