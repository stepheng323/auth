/* eslint-disable max-len */
export const respondWithSuccess = (res: any, statusCode = 200, message: string, additionalFields: any) => res.status(statusCode).send({
  success: true,
  message,
  payload: additionalFields,
});

export const respondWithWarning = (res: any, statusCode = 500, message: string, additionalFields: any) => res.status(statusCode).send({
  success: false,
  message,
  payload: additionalFields,
});
